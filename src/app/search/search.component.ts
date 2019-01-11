import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
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
      iataCode: 'SAO',
    },
    {
      name: 'Santiago de Chile',
      iataCode: 'SCL',
    },
  ];

  country;
  destination;
  origins = [];
  destinations = [];
  myParams;
  searchOptions = {
    country: '',
    destination: '',
  };
  options: FormGroup;
  data;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bestPriceService: BestPriceService,
    private datepipe: DatePipe
  ) {
    this.options = fb.group({
      country: '',
      origin: '',
      destination: '',
      departureDateMin: '',
    });
    this.getUrlParams();
    console.log(this.origins);
    console.log(this.destinations);
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
      this.destination.splice(position, 1);
    } else {
      this.destinations.push(v);
    }
    this.searchOptions['destination'] = this.destinations.join();
  }

  checkDepartureDate(event) {
    console.log(event);
    const departureDate = event.target.innerHTML;
    const departureDateFormated = this.datepipe.transform(
      departureDate,
      'yyyy-MM-dd'
    );
    console.log(departureDateFormated);
    this.searchOptions['departureDateMin'] = departureDateFormated;
  }
}
