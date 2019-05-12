import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GamesApiService } from "../../services/api";
import { IGame } from "../../models";

@Component({
  selector: 'app-game-constructor',
  templateUrl: './game-constructor.component.html',
  styleUrls: ['./game-constructor.component.scss']
})
export class GameConstructorComponent implements OnInit {

  public game: IGame = null;
  public loaded: boolean = false;

  constructor(private route: ActivatedRoute,
              private api: GamesApiService) {
  }

  ngOnInit() {
    this.api.doRetrieveApiCall(this.route.snapshot.params.id).subscribe(
      (data: IGame) => {
        this.game = data;
        this.loaded = true;
      },
      (response) => {
        this.loaded = true;
      }
    )
  }

}
