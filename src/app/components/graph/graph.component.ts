import {
  Component,
  Input,
  ChangeDetectorRef,
  HostListener,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit, Output, EventEmitter
} from '@angular/core';
import { D3Link, D3Node, ForceDirectedGraph } from '../../models';
import { D3Service } from '../../services/d3.service';

@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrapper">
      <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
        <g [zoomableOf]="svg">
          <g [linkVisual]="link" *ngFor="let link of links"
             (deleted)="removeLink($event)"
             (selected)="selectedLink($event)"></g>
          <g [nodeVisual]="node" *ngFor="let node of nodes"
             (deleted)="removeNode($event)"
             (selected)="selectedNode($event)"
             [draggableNode]="node" [draggableInGraph]="graph"></g>
        </g>
      </svg>
    </div>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input() nodes;
  @Input() links;
  @Input() transitionMode: boolean;
  @Output() nodeDeleted: EventEmitter<D3Node> = new EventEmitter<D3Node>();
  @Output() linkDeleted: EventEmitter<D3Link> = new EventEmitter<D3Link>();
  @Output() nodeSelected: EventEmitter<D3Node> = new EventEmitter<D3Node>();
  @Output() linkSelected: EventEmitter<D3Node> = new EventEmitter<D3Node>();

  public graph: ForceDirectedGraph;
  private _options: { width, height } = {width: 1000, height: 600};

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  constructor(private d3Service: D3Service,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  get options() {
    return this._options = {
      width: 1000,
      height: 400
    };
  }

  public removeNode(node: D3Node) {
    this.nodeDeleted.emit(node);
  }

  public removeLink(link: D3Link) {
    this.linkDeleted.emit(link);
  }

  public selectedNode(node: D3Node) {
    this.nodeSelected.emit(node);
  }

  public selectedLink(node: D3Node) {
    this.linkSelected.emit(node);
  }
}
