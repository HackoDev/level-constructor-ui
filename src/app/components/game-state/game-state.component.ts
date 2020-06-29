import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IStateChanges } from '../../models';
import { StateFormPropertyComponent } from '../state-form-property/state-form-property.component';

@Component({
  selector: 'app-game-state',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.scss']
})
export class GameStateComponent implements OnInit {
  @Input() state: object;
  @Output() stateChanged: EventEmitter<IStateChanges> = new EventEmitter<IStateChanges>();

  public key: string;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  public editField(field_name: string) {
    const dialogRef = this.dialog.open(StateFormPropertyComponent, {
      width: '450px',
      data: {
        field: field_name,
        data: {
          statement: field_name,
          value: this.state[field_name].value,
          description: this.state[field_name].description
        }
      }
    });

    dialogRef.afterClosed().subscribe((result: IStateChanges) => {
      if (result) {
        this.stateChanged.emit(result);
      }
    });
  }

  public getFields() {
    return Object.keys(this.state);
  }

}
