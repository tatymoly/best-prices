import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
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
      iataCode: 'SAO',
    },
    {
      name: 'Santiago de Chile',
      iataCode: 'SCL',
    },
  ];

  country: string;
  destination: string;
  data: string;
  departureDateMin: string;
  departureDateFormated: string;
  returnDateMin: string;
  returnDateFormated: string;
  origins = [];
  destinations = [];
  myParams: Object;
  searchOptions = {
    country: '',
    destination: '',
  };
  options: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bestPriceService: BestPriceService,
    private datepipe: DatePipe
  ) {
    this.options = fb.group({
      country: ['', Validators.required],
      origin: '',
      destination: ['', Validators.required],
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
    this.bestPriceService
      .searchBestPrices(this.searchOptions)
      .subscribe(res => {
        console.log(res);
        this.data = res;
      });
  }

  checkCountryValue(event) {
    const v = event.target.innerHTML;
    this.searchOptions['country'] = v;
  }

  checkOriginValue(event) {
    const v = event.source.value;
    const position = this.origins.indexOf(v);
    if (position > 0) {
      this.origins.splice(position, 1);
    } else {
      this.origins.push(v);
    }
    this.searchOptions['origin'] = this.origins.join();
  }

  checkDestinationValue(event) {
    const v = event.source.value;
    const position = this.destinations.indexOf(v);
    if (position > 0) {
      this.destinations.splice(position, 1);
    } else {
      this.destinations.push(v);
    }
    this.searchOptions['destination'] = this.destinations.join();
  }

  checkDepartureDate(event) {
    const v = event.value;
    this.departureDateFormated = this.datepipe.transform(v, 'yyyy-MM-dd');
    console.log(this.departureDateFormated);
    this.searchOptions['departureDateMin'] = this.departureDateFormated;
  }
  checkReturnDate(event) {
    const v = event.value;
    this.returnDateFormated = this.datepipe.transform(v, 'yyy-MM-dd');
    console.log(this.returnDateFormated);
    this.searchOptions['returnDateMin'] = this.returnDateFormated;
  }
}
