import { Injectable } from "@angular/core";

import { BaseAPIService } from "./base.service";


@Injectable()
export class LocationsApiService extends BaseAPIService {
  sourceUrl = 'locations';
}
