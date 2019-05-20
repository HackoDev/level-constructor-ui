import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { NodePropertiesDialogData } from "../../models";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-node-properties',
  templateUrl: './node-properties.component.html',
  styleUrls: ['./node-properties.component.scss']
})
export class NodePropertiesComponent {
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

}
