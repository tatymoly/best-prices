import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';

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

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.myParams = params;
    });
  }

  searchBestPrices() {
    return this.http.get<any>(this.url, { params: this.myParams }).pipe(
      map(res => {
        return res;
      })
    );
  }
}
