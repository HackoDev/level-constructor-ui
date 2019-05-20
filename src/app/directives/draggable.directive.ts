import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { D3Node, ForceDirectedGraph } from '../models';
import { D3Service } from "../services/d3.service";

@Directive({
  selector: '[draggableNode]'
})
export class DraggableDirective implements OnInit {
  @Input('draggableNode') draggableNode: D3Node;
  @Input('draggableInGraph') draggableInGraph: ForceDirectedGraph;

  constructor(private d3Service: D3Service, private _element: ElementRef) {
  }

  ngOnInit() {
    this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.draggableNode, this.draggableInGraph);
  }
}
