import { Injectable } from "@angular/core";

import { BaseAPIService } from "./base.service";


@Injectable()
export class TransitionsApiService extends BaseAPIService {
  sourceUrl = 'transitions';
}
