import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BestPriceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  myParams;
  private url = 'https://viajala.com.co/services/flight/best-price';

  constructor(private http: HttpClient) {}

  searchBestPrices(params) {
    return this.http.get<any>(this.url, { params }).pipe(
      map(res => {
        return res;
      })
    );
  }
}
