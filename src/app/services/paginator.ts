import { BaseAPIService } from './api/base.service';


export interface IPaginationResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}

export class GenericPaginator<T> {
  private apiClient: BaseAPIService;
  private pageNumber: number;
  private hasNext: boolean;
  private hasPrev: boolean;
  private searchParams: object;
  private pageSize: number;
  private totalCount: number;
  private loaded: boolean;
  public records: Array<T>;

  constructor(apiClient, pageSize: number = 20) {
    this.pageSize = pageSize;
    this.apiClient = apiClient;
    this.records = [];
    this.totalCount = 1;
    this.pageNumber = 1;
    this.searchParams = {};
    this.loaded = false;
  }

  public hasNextPage() {
    return this.hasNext;
  }

  public hasPrevPage() {
    return this.hasPrev;
  }

  public setPageSize(value: number) {
    this.pageSize = value;
  }

  public setPageNumber(value: number) {
    this.pageNumber = value;
  }

  public nextPage() {
    if (this.hasNextPage() && this.loaded) {
      this.setPageNumber(this.pageNumber + 1);
      this.callApi();
    }
  }

  public prevPage() {
    if (this.hasPrevPage() && this.loaded) {
      this.setPageNumber(this.pageNumber - 1);
      this.callApi();
    }
  }

  public setSearchParams(params: object) {
    this.searchParams = params;
  }

  public updateSearchParams(params: object) {
    Object.assign(this.searchParams, params);
  }

  /**
   * @description
   * Calls List Api for the current template <T> and resource.
   */
  public callApi(onError?) {
    this.loaded = false;
    this.apiClient
      .doListApiCall(this.pageNumber, this.pageSize, this.searchParams)
      .subscribe(
        (records: IPaginationResponse<T>) => {
          this.hasNext = !!records.next;
          this.hasPrev = !!records.previous;
          this.records = records.results;
          this.totalCount = records.count;
          this.loaded = true;
        },
        (response) => {
          this.loaded = true;
          this.records = [];
          if (onError) {
            onError(response);
          }
        }
      );
  }

  public getLength() {
    return this.totalCount;
  }

  public isLoaded(): boolean {
    return this.loaded;
  }
}
