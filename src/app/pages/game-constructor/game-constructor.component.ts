import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as shape from 'd3-shape';
import {
  GamesApiService,
  LocationsApiService,
  TransitionsApiService
} from '../../services/api';
import { IExtendedGame, IGame, IStateChanges } from '../../models';
import {
  LinkPropertiesComponent,
  NodePropertiesComponent
} from '../../components';
import { MatDialog } from '@angular/material/dialog';
import { INodeMetadata, TransitionType } from '../../models/node';
import { ILinkMetadata } from '../../models/link';
import { ParserService } from '../../services/parser.service';
import { Node } from '@swimlane/ngx-graph';


@Component({
  selector: 'app-game-constructor',
  templateUrl: './game-constructor.component.html',
  styleUrls: ['./game-constructor.component.scss']
})
export class GameConstructorComponent implements OnInit {
  public curve: any = shape.curveBundle.beta(1);
  public game: IGame = null;
  public loaded = false;
  public transitionMode = false;
  public transitionNode: ILinkMetadata = null;
  public stateName = '';

  public nodes: any[] = [];
  public links: any[] = [];

  constructor(private route: ActivatedRoute,
              private api: GamesApiService,
              private locationApi: LocationsApiService,
              private transitionApi: TransitionsApiService,
              public parser: ParserService,
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
            initial_state: data.initial_state,
            description: data.description
          };
          this.nodes = data.visualization.locations.map(elem => {
            return Object.assign(elem, {position: {x: 245, y: 90}});
          });
          this.links = data.visualization.transitions.map(e => {
            e.id = `l${e.id}`;
            return e;
          });
          this.loaded = true;
        },
        (response) => {
          this.loaded = true;
        }
      );
    });
  }

  public getTooltip(node: any) {
    return `<h2>${node.name}</h2> <p>${node.description}</p>`;
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

  removeNode(node: INodeMetadata) {
    this.locationApi.doDeleteApiCall(node.id).subscribe(
      () => {
        this.links = this.links.filter((l) => {
          return l.source !== node.id && l.target !== node.id;
        });
        this.nodes = this.nodes.filter(n => n.id !== node.id);
      }
    );
  }

  removeLink(link: ILinkMetadata) {
    this.transitionApi.doDeleteApiCall(link.id.replace('l', '')).subscribe(() => {
      this.links = this.links.filter((n) => {
        return n.id !== link.id;
      });
    });
  }

  public toggleTransitionMode() {
    this.transitionMode = !this.transitionMode;
  }

  public isTransitionMode(): boolean {
    return this.transitionMode;
  }

  nodeSelected(node): void {
    if (this.transitionMode) {
      if (this.transitionNode === null) {
        this.transitionNode = node;
      } else {
        const transition: ILinkMetadata = {
          id: null,
          label: '',
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
      data: node,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.deleted) {
          return this.removeNode(node);
        }
        this.locationApi.doUpdateApiCall(node.id, result).subscribe(
          (resp: INodeMetadata) => {
            node.name = resp.name;
            Object.assign(node, resp);
            if (resp.type === TransitionType.START) {
              this.nodes.forEach(i => {
                if (i.id !== resp.id && i.metadata.type === TransitionType.START) {
                  i.metadata.type = TransitionType.DEFAULT;
                }
              });
            }
          }
        );
      }
    });
  }

  linkSelected(link: ILinkMetadata): void {
    if (this.transitionMode) {
      return;
    }

    const dialogRef = this.dialog.open(LinkPropertiesComponent, {
      width: '450px',
      data: {
        ...link,
        states: Object.keys(this.game.initial_state)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.deleted) {
          return this.removeLink(link);
        }
        this.transitionApi.doUpdateApiCall(link.id.replace('l', ''), result)
          .subscribe(
            (data: ILinkMetadata) => {
              Object.assign(link, data, {id: link.id});
            }
          );
      }
    });
  }

  public addStatement() {
    if (this.stateName && this.stateName.trim().length > 0) {
      const statement = this.stateName.trim();
      this.game.initial_state[statement] = {description: '', value: null};
      this.api.doUpdateApiCall(this.game.id, {initial_state: this.game.initial_state})
        .subscribe(
          (data: IGame) => this.game = data
        );
      this.stateName = '';
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
        };
      }
      this.api.doUpdateApiCall(this.game.id, {initial_state: this.game.initial_state})
        .subscribe(
          (data: IGame) => this.game = data
        );
    }
  }

}
