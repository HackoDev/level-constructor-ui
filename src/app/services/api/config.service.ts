import { Injectable } from "@angular/core";

import { BaseAPIService } from "./base.service";


@Injectable()
export class ConfigApiService extends BaseAPIService {
  sourceUrl = 'config';
}
