import { Component, EventEmitter, Input, Output } from '@angular/core';

import { D3Link } from '../../models';

@Component({
  selector: '[linkVisual]',
  template: `
    <svg:line
      class="link"
      (click)="clickHandler()"
      [attr.x1]="link.source.x"
      [attr.y1]="link.source.y"
      [attr.x2]="link.target.x"
      [attr.y2]="link.target.y"
    ></svg:line>
  `,
  styleUrls: ['./link-visual.component.scss']
})
export class LinkVisualComponent {
  @Input('linkVisual') link: D3Link;
  @Output() deleted: EventEmitter<D3Link> = new EventEmitter<D3Link>();
  @Output() selected: EventEmitter<D3Link> = new EventEmitter<D3Link>();

  public clickHandler() {
    this.selected.emit(this.link);
  }
}
