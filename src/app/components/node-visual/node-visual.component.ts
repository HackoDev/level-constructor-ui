import { Component, EventEmitter, Input, Output } from '@angular/core';
import { D3Node } from "../../models";
import { TransitionType } from "../../models/node";

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'"
           (click)="clickHandler()">
      <svg:circle
        class="node"
        [attr.fill]="getColor()"
        cx="0" cy="0"
        r="10px">
      </svg:circle>
      <svg:text
        class="node-name">
        {{ node.title }}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.scss']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: D3Node;
  @Output() deleted: EventEmitter<D3Node> = new EventEmitter<D3Node>();
  @Output() selected: EventEmitter<D3Node> = new EventEmitter<D3Node>();

  public clickHandler() {
    this.selected.emit(this.node);
  }

  public getColor() {
    if (this.node.metadata.type == TransitionType.START) {
      return 'rgb(250,246,6)';
    }
    if (this.node.metadata.type == TransitionType.FINISH) {
      return 'rgb(0,168,45)';
    }
    return 'rgb(0,106,197)';
  }
}
