import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {WrappedHttpResponse} from './api.wrapped.http.response';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  defaultHeaders: any = {
    'Content-Type': 'application/json'
  };

  constructor(private readonly http: HttpClient) { }

  request$(method: string, path: string, params?: any, data?: any, headers?: any): Observable<any> {

    const headerList = _.assign({}, this.defaultHeaders, headers);
    const reqHeaders: HttpHeaders = new HttpHeaders(headerList);
    let reqParams: HttpParams = new HttpParams();

    if (params) {
      if (params instanceof HttpParams) {
        reqParams = params;
      } else {
        Object.keys(params).forEach(function(key) {
          reqParams = reqParams.append(key, params[key]);
        });
      }
    }

    return this.http.request(method, path, {
      headers: reqHeaders,
      params: reqParams,
      body: data
    })
      .pipe(
        map(response  => {
          if (response instanceof HttpResponse) {
            return new WrappedHttpResponse(response as HttpResponse<any>);
          }
          return response;
        }),
        catchError(error => {
          // TODO log the error and show a message to the user
          return throwError(error);
        }),
        finalize(() => {})
      );
  }

  delete$<T>(path: string, data?: any, params?: any): Observable<any> {
    return this.request$('DELETE', path, params, data, {});
  }

  get$<T>(path: string, params?: any): Observable<any> {
    return this.request$('GET', path, params, {}, {});
  }

  patch$<T>(path: string, data?: any): Observable<any> {
    return this.request$('PATCH', path, {}, data, {});
  }

  post$<T>(path: string, data?: any): Observable<any> {
    return this.request$('POST', path, {}, data, {});
  }

  put$<T>(path: string, data?: any, params?: any ): Observable<any> {
    return this.request$('PUT', path, params, data, {});
  }

  // used mainly to attach the Authorization header...
  setHeader(header, value) {
    if (header && value) {
      this.defaultHeaders[header] = value;
    }
  }
}
