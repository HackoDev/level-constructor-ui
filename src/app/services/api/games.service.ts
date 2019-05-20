import { Injectable } from "@angular/core";

import { BaseAPIService } from "./base.service";
import { Observable } from "rxjs";
import { IExtendedGame } from "../../models";


@Injectable()
export class GamesApiService extends BaseAPIService {
  sourceUrl = 'games';

  public doVisualizationApiCall(id: number): Observable<IExtendedGame> {
    return this.client.get<IExtendedGame>(`${this.getObjectUrl(id)}visualization/`);
  }
}
