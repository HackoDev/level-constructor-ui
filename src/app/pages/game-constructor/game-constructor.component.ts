import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {
  GamesApiService,
  LocationsApiService,
  TransitionsApiService
} from "../../services/api";
import {
  D3Link,
  D3Node,
  IExtendedGame,
  IGame,
  IStateChanges
} from "../../models";
import {
  GraphComponent,
  LinkPropertiesComponent,
  NodePropertiesComponent
} from "../../components";
import { MatDialog } from "@angular/material";
import { INodeMetadata, TransitionType } from "../../models/node";
import { ILinkMetadata } from "../../models/link";
import { ParserService } from "../../services/parser.service";

@Component({
  selector: 'app-game-constructor',
  templateUrl: './game-constructor.component.html',
  styleUrls: ['./game-constructor.component.scss']
})
export class GameConstructorComponent implements OnInit {

  @ViewChild(GraphComponent) graphChild: GraphComponent;

  public game: IGame = null;
  public loaded: boolean = false;
  public transitionMode: boolean = false;
  public transitionNode: D3Node = null;
  public state_name: string = '';

  public nodes: D3Node[] = [];
  public links: D3Link[] = [];

  constructor(private route: ActivatedRoute,
              private api: GamesApiService,
              private locationApi: LocationsApiService,
              private transitionApi: TransitionsApiService,
              public parser: ParserService,
              public dialog: MatDialog,) {
  }

  ngOnInit() {
    this.fetchFromServer();
  }

  fetchFromServer() {
    this.loaded = false;
    this.links = [];
    this.nodes = [];
    this.route.data.subscribe((params) => {
      this.api.doVisualizationApiCall(this.route.snapshot.params.id).subscribe(
        (data: IExtendedGame) => {
          this.game = {
            id: data.id,
            title: data.title,
            initial_state: data.initial_state,
            description: data.description
          };
          data.visualization.locations.forEach((elem) => {
            this.nodes.push(new D3Node(elem.id, elem.name, elem));
          });
          data.visualization.transitions.forEach((elem) => {
            this.links.push(new D3Link(elem.source, elem.target, elem));
          });
          this.loaded = true;
        },
        (response) => {
          this.loaded = true;
        }
      )
    });

  }

  public locationDialog(): void {
    const dialogRef = this.dialog.open(NodePropertiesComponent, {
      width: '450px',
      data: {
        id: null,
        name: 'New Location',
        description: '',
        type: TransitionType.DEFAULT
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationApi.doCreateApiCall({game: this.game.id, ...result})
          .subscribe(
            () => {
              this.fetchFromServer();
            });
      }
    });
  }

  removeNode(node: D3Node) {
    this.locationApi.doDeleteApiCall(node.id).subscribe(
      () => {
        this.nodes = this.nodes.filter(n => n.id !== node.id);
        this.links = this.links.filter((n) => {
          return n.source.id !== node.id && n.target.id !== node.id
        });
      }
    );
  }

  removeLink(link: D3Link) {
    this.links = this.links.filter((n) => {
      return n.metadata.id !== link.metadata.id
    });
  }

  public toggleTransitionMode() {
    this.transitionMode = !this.transitionMode;
  }

  public isTransitionMode(): boolean {
    return this.transitionMode;
  }

  nodeSelected(node: D3Node): void {
    if (this.transitionMode) {
      console.log(node);
      if (this.transitionNode === null) {
        this.transitionNode = node;
      } else {
        const transition: ILinkMetadata = {
          id: null,
          source: this.transitionNode.id,
          target: node.id,
          game: this.game.id,
          condition: '',
          condition_rules: {},
          state: {},
          state_rules: {},
          position: 1,
          weight: 0,
          is_visible: true,
          meta: {}
        };
        this.transitionApi.doCreateApiCall(transition).subscribe(
          () => this.fetchFromServer()
        );
        this.transitionNode = null;
      }
      return;
    }
    const dialogRef = this.dialog.open(NodePropertiesComponent, {
      width: '450px',
      data: node.metadata,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.deleted) {
          return this.removeNode(node);
        }
        this.locationApi.doUpdateApiCall(node.id, result).subscribe(
          (resp: INodeMetadata) => {
            node.title = resp.name;
            node.metadata = resp;
            if (resp.type == TransitionType.START) {
              this.nodes.forEach(i => {
                if (i.id != resp.id && i.metadata.type == TransitionType.START) {
                  i.metadata.type = TransitionType.DEFAULT;
                }
              });
            }
            this.graphChild.graph.ticker.emit(this.graphChild.graph.simulation);
          }
        );
      }
    });
  }

  linkSelected(link: D3Link): void {
    if (this.transitionMode) {
      return;
    }

    const dialogRef = this.dialog.open(LinkPropertiesComponent, {
      width: '450px',
      data: {
        ...link.metadata,
        states: Object.keys(this.game.initial_state)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.deleted) {
          return this.removeLink(link);
        }
        this.transitionApi.doUpdateApiCall(link.metadata.id, result)
          .subscribe(
            (data: ILinkMetadata) => {
              link.metadata = data;
              this.graphChild.graph.ticker.emit(this.graphChild.graph.simulation);
            }
          );
      }
    });
  }

  public addStatement() {
    if (this.state_name && this.state_name.trim().length > 0) {
      const statement = this.state_name.trim();
      this.game.initial_state[statement] = {description: '', value: null};
      this.api.doUpdateApiCall(this.game.id, {initial_state: this.game.initial_state})
        .subscribe(
          (data: IGame) => this.game = data
        );
      this.state_name = '';
    }
  }

  public stateChanged(result: IStateChanges) {
    if (result) {
      if (result.data.deleted) {
        delete this.game.initial_state[result.field];
      } else {
        if (result.field !== result.data.statement) {
          delete this.game.initial_state[result.field];
        }
        this.game.initial_state[result.data.statement] = {
          value: result.data.value,
          description: result.data.description
        }
      }
      this.api.doUpdateApiCall(this.game.id, {initial_state: this.game.initial_state})
        .subscribe(
          (data: IGame) => this.game = data
        );
    }
  }

}
