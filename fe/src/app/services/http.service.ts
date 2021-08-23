import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import 'rxjs';
import 'rxjs-compat';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  server: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getData(link) {
    return this.http.get<any[]>(this.server + link);
  }

  postData(link, body): any {
    const headers = { 'content-type': 'application/json' };
    return this.http.post<any>(this.server + link, body, {
      headers,
      observe: 'response',
    });
  }
}
