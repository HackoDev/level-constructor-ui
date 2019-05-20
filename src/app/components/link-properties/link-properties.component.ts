import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { LinkPropertiesDialogData } from "../../models";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-link-properties',
  templateUrl: './link-properties.component.html',
  styleUrls: ['./link-properties.component.scss']
})
export class LinkPropertiesComponent {
  constructor(
    public dialogRef: MatDialogRef<LinkPropertiesComponent>,
    @Inject(MAT_DIALOG_DATA) public instance: LinkPropertiesDialogData) {
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
