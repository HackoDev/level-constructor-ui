import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { GamesApiService } from "../../services/api";
import { IGame } from "../../models";
import { Router } from "@angular/router";

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

  @Input() instance: IGame;
  public errors: object = null;

  constructor(private api: GamesApiService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.instance === null) {
      this.instance = {
        id: null,
        title: '',
        description: '',
      }
    }
  }

  public saveChanges(form: NgForm) {
    if (form.valid) {
      if (this.instance.id === null) {
        this.api.doCreateApiCall(form.value).subscribe(
          (data: IGame) => {
            this.instance = data;
            this.router.navigate(['/games', data.id, 'constructor']);
          },
          (response) => this.errors = response.error
        );
      } else {
        this.api.doUpdateApiCall(this.instance.id, form.value).subscribe(
          (data: IGame) => this.instance = data,
          (response) => this.errors = response.error,
        )
      }
    }
  }

}
