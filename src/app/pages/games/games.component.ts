import { Component, OnInit } from '@angular/core';
import { GamesApiService } from "../../services/api";
import { GenericPaginator } from "../../services/paginator";
import { IGame } from "../../models";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  public games: Object[];
  public paginator: GenericPaginator<IGame>;

  constructor(private api: GamesApiService) {
    this.paginator = new GenericPaginator<IGame>(this.api);
  }

  ngOnInit() {
    this.paginator.callApi();
  }

}
