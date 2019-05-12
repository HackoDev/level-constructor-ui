import { Injectable } from "@angular/core";

import { BaseAPIService } from "./base.service";


@Injectable()
export class GamesApiService extends BaseAPIService {
  sourceUrl = 'games';
}
