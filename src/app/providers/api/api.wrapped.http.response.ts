import { HttpHeaders, HttpResponse } from '@angular/common/http';

export class WrappedHttpResponse<T> {
  url: string = null;
  data: any = null;
  body: any = null;
  status: number = null;
  statusText: string = null;
  headers: HttpHeaders = null;
  type: any = null;

  constructor(resp: HttpResponse<T>) {
    this.url = resp.url;
    this.data = resp.body;
    this.body = resp.body;
    this.status = resp.status;
    this.statusText = resp.statusText;
    this.headers = resp.headers;
    this.type = resp.type;
  }
}
