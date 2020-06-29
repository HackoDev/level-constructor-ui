import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { NodePropertiesDialogData } from '../../models';
import { NgForm } from '@angular/forms';
import { TransitionType } from '../../models/node';

@Component({
  selector: 'app-node-properties',
  templateUrl: './node-properties.component.html',
  styleUrls: ['./node-properties.component.scss']
})
export class NodePropertiesComponent {

  public types = [
    TransitionType.DEFAULT,
    TransitionType.START,
    TransitionType.FINISH
  ];

  constructor(
    public dialogRef: MatDialogRef<NodePropertiesComponent>,
    @Inject(MAT_DIALOG_DATA) public instance: NodePropertiesDialogData) {
  }

  close(): void {
    this.dialogRef.close();
  }

  save(form: NgForm): void {
    if (form.valid) {
      this.dialogRef.close(this.instance);
    }
  }

  delete(): void {
    this.instance.deleted = true;
    this.dialogRef.close(this.instance);
  }

  public getTransitionType(type) {
    switch (type) {
      case TransitionType.START:
        return 'Is Start';
      case TransitionType.FINISH:
        return 'Is Finish';
      default:
        return 'Default';
    }
  }

}
