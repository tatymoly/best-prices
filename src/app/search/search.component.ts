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
    {
      name: 'Sao Pablo',
      iatacode: 'SAO',
    },
    {
      name: 'Santiago de Chile',
      iataCode: 'SCL',
    },
  ];

  country;
  destination;
  myParams;
  searchOptions = {
    country: '',
    destination: '',
  };
  options: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bestPriceService: BestPriceService
  ) {
    this.options = fb.group({
      country: '',
      origin: '',
      destination: '',
    });
    this.getUrlParams();
  }

  ngOnInit() {}

  getUrlParams() {
    this.route.queryParams.subscribe(params => {
      this.myParams = params;
      this.sendParamsOptions();
    });
  }

  sendParamsOptions() {
    console.log(this.options);
    this.searchOptions.country = this.options.get('country').value;
    console.log(this.searchOptions.country);
    this.searchOptions.destination = this.options.get('destination').value;
    console.log(this.searchOptions.destination);
    this.bestPriceService
      .searchBestPrices(this.searchOptions)
      .subscribe(res => {
        console.log(res);
      });
  }
}
