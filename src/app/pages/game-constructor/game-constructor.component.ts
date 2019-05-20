import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {
  GamesApiService,
  LocationsApiService,
  TransitionsApiService
} from "../../services/api";
import { D3Link, D3Node, IExtendedGame, IGame } from "../../models";
import {
  GraphComponent,
  LinkPropertiesComponent,
  NodePropertiesComponent
} from "../../components";
import { MatDialog } from "@angular/material";
import { INodeMetadata } from "../../models/node";
import { ILinkMetadata } from "../../models/link";

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
  nodes: D3Node[] = [];
  links: D3Link[] = [];

  constructor(private route: ActivatedRoute,
              private api: GamesApiService,
              private locationApi: LocationsApiService,
              private transitionApi: TransitionsApiService,
              public dialog: MatDialog) {
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
        is_start: false,
        is_finish: false
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

  public setLoaded(value?: boolean) {
    this.loaded = value === undefined ? true : value;
  }

  removeNode(node: D3Node) {
    this.locationApi.doDeleteApiCall(node.id).subscribe(
      () => {
        this.nodes = this.nodes.filter(n => n.id !== node.id);
        console.log(this.links.length);
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
          condition: {},
          state: {},
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
      data: node.metadata
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
      data: link.metadata
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

}
