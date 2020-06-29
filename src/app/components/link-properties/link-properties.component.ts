import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

import { LinkPropertiesDialogData } from '../../models';
import { ParserService } from '../../services/parser.service';

@Component({
  selector: 'app-link-properties',
  templateUrl: './link-properties.component.html',
  styleUrls: ['./link-properties.component.scss']
})
export class LinkPropertiesComponent {

  constructor(
    public dialogRef: MatDialogRef<LinkPropertiesComponent>,
    public parser: ParserService,
    @Inject(MAT_DIALOG_DATA) public instance: LinkPropertiesDialogData) {
    instance.states.forEach(key => {
      if (!this.instance.state[key]) {
        this.instance.state[key] = '';
      }
    });
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

  isValidCondition() {
    try {
      this.instance.condition_rules = this.parser.buildBoolExpression(this.instance.condition);
    } catch (e) {
      this.instance.condition_rules = {};
    }
    return !!this.instance.condition_rules;
  }

  public isValidStateField(state) {
    try {
      this.instance.state_rules[state] = this.parser.buildStateExpression(this.instance.state[state]);
    } catch (e) {
      this.instance.state_rules[state] = null;
    }
    return !!this.instance.state_rules[state];
  }

}
