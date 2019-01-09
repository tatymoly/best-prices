import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { BestPriceService } from '../shared/services/best-price.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  countryGroup = [
    {
      country: 'CO',
    },
    {
      country: 'CL',
    },
  ];
  cityGroup = [
    {
      name: 'Bogotá',
      iataCode: 'BOG',
    },
    {
      name: 'Medellín',
      iataCode: 'MDE',
    },
  ];

  travelTypes: string[] = ['Ida y Regreso', 'Solo Ida'];
  travelTpye: string;
  cities: string;
  country: string;
  myObj = {
    country: '',
    destination: '',
  };
  myParams;

  constructor(
    private route: ActivatedRoute,
    private bestPriceService: BestPriceService
  ) {
    this.getUrlParams();
    console.log(this.country);
    console.log(this.cities);
    this.myObj.country = this.country;
    this.myObj.destination = this.cities;
  }

  ngOnInit() {}

  getUrlParams() {
    this.route.queryParams.subscribe(params => {
      this.myParams = params;
      this.sendParamsOptions();
    });
  }

  sendParamsOptions() {
    console.log(this.country);
    console.log(this.cities);
    this.bestPriceService.searchBestPrices(this.myObj).subscribe(res => {
      console.log(res);
    });
  }
}
