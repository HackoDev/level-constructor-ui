import { Component, Inject, OnInit } from '@angular/core';
import { IStateChanges } from '../../models';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-state-form-property',
  templateUrl: './state-form-property.component.html',
  styleUrls: ['./state-form-property.component.scss']
})
export class StateFormPropertyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StateFormPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public instance: IStateChanges
  ) {
  }

  ngOnInit() {
  }

  public save(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.instance);
    }
  }

  public cancel() {
    this.dialogRef.close();
  }

  public delete() {
    this.instance.data.deleted = true;
    this.dialogRef.close(this.instance);
  }
}
