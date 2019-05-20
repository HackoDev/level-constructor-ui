import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export abstract class BaseAPIService {
  abstract sourceUrl: string;

  constructor(protected client: HttpClient) {
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

  public doCreateApiCall(params: object) {
    return this.client.post(this.getListUrl(), params);
  }

  public doRetrieveApiCall(id: number) {
    return this.client.get(this.getObjectUrl(id));
  }

  public doUpdateApiCall(id: number, params: object) {
    return this.client.patch(this.getObjectUrl(id), params);
  }

  public doDeleteApiCall(id: number): Observable<null> {
    return this.client.delete<null>(this.getObjectUrl(id));
  }
}
