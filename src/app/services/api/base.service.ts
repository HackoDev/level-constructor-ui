import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { IGame } from "../../models";

@Injectable()
export abstract class BaseAPIService {
  abstract sourceUrl: string;

  constructor(private client: HttpClient) {
  }

  public getListUrl() {
    return `/api/${this.sourceUrl}/`;
  }

  public getObjectUrl(id: number) {
    return `/api/${this.sourceUrl}/${id}/`;
  }

  public doListApiCall(pageNumber: number = 1, pageSize: number = 20, attrs: object = {}) {
    const params = {
      ...attrs,
      limit: pageSize.toString(),
      offset: ((pageNumber - 1) * pageSize).toString(),
    };
    return this.client.get(this.getListUrl(), {params: params});
  }

  public doCreateApiCall(params: object): Observable<IGame> {
    return this.client.post<IGame>(this.getListUrl(), params);
  }

  public doRetrieveApiCall(id: number): Observable<IGame> {
    return this.client.get<IGame>(this.getObjectUrl(id));
  }

  public doUpdateApiCall(id: number, params: object): Observable<IGame> {
    return this.client.patch<IGame>(this.getObjectUrl(id), params);
  }

  public doDeleteApiCall(id: number): Observable<null> {
    return this.client.delete<null>(this.getObjectUrl(id));
  }
}
