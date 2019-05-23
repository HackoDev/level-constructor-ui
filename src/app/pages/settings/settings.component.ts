import { Component, Input, OnInit } from '@angular/core';
import { IConfig, IGame } from "../../models";
import { ConfigApiService, GamesApiService } from "../../services/api";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public config: IConfig = null;
  public errors: object = null;
  public loaded: boolean = false;
  public status: 'saving' | 'failed' | 'successfully' = null;

  constructor(private api: ConfigApiService,
              private router: Router) {
  }

  ngOnInit() {
    this.api.doRetrieveApiCall(null).subscribe(
      (config: IConfig) => {
        this.loaded = true;
        this.config = config;
      },
      () => {
        this.loaded = true;
        this.config = {bool_expression_rules: '', state_expression_rules: ''};
      }
    );
  }

  public saveChanges(form: NgForm) {
    if (form.valid) {
      this.status = 'saving';
      this.api.doUpdateApiCall(null, form.value).subscribe(
        (data => this.status = 'successfully'),
        (data => this.status = 'failed')
      )
    }
  }
}
