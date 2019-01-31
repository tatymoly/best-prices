import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BestPriceService } from '../../services/best-price.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: '../templates/search.component.html',
  styleUrls: ['../styles/search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  countryGroup = [
    {
      country: 'CO',
    },
    {
      country: 'CL',
    },
    {
      country: 'BR',
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
  showError: Boolean = false;
  loading: Boolean = false;
  validForm: Boolean = false;
  showFilter: Boolean = true;
  searchDone: Boolean = false;
  searchOptions = {
    country: '',
    destination: '',
  };
  options: FormGroup;
  selectedIndex = 1;

  private unsub: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bestPriceService: BestPriceService,
    private datepipe: DatePipe
  ) {
    this.options = fb.group({
      country: ['', [Validators.required]],
      origin: '',
      destination: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  getUrlParams() {
    this.route.queryParams.pipe(takeUntil(this.unsub)).subscribe(params => {
      this.myParams = params;
      this.sendParamsOptions();
    });
  }

  sendParamsOptions() {
    this.checkSameValues();
    this.loading = true;
    this.bestPriceService
      .searchBestPrices(this.searchOptions)
      .pipe(takeUntil(this.unsub))
      .subscribe(res => {
        this.data = res;
        this.searchDone = true;
        this.loading = false;
        this.selectedIndex = 0;
      });
  }

  checkCountryValue(event) {
    const v = event.target.innerHTML;
    this.searchOptions['country'] = v;
    this.checkValidForm();
  }

  checkOriginValue(event) {
    const v = event.source.value;
    const position = this.origins.indexOf(v);
    if (position > -1) {
      this.origins.splice(position, 1);
    } else {
      this.origins.push(v);
    }
    this.searchOptions['origin'] = this.origins.join();
  }

  checkDestinationValue(event) {
    const v = event.source.value;
    const position = this.destinations.indexOf(v);
    if (position > -1) {
      this.destinations.splice(position, 1);
    } else {
      this.destinations.push(v);
    }
    this.searchOptions['destination'] = this.destinations.join();
    this.checkValidForm();
  }

  checkDepartureDate(event) {
    const v = event.value;
    this.departureDateFormated = this.datepipe.transform(v, 'yyyy-MM-dd');
    this.searchOptions['departureDateMin'] = this.departureDateFormated;
  }
  checkReturnDate(event) {
    const v = event.value;
    this.returnDateFormated = this.datepipe.transform(v, 'yyy-MM-dd');
    this.searchOptions['returnDateMin'] = this.returnDateFormated;
  }

  checkSameValues() {
    if (this.destinations.every(e => this.origins.includes(e))) {
      this.showError = true;
    } else {
      this.showError = false;
    }
  }

  checkValidForm() {
    if (
      this.searchOptions.destination.length !== 0 &&
      this.searchOptions.country.length !== 0
    ) {
      this.validForm = true;
    } else {
      this.validForm = false;
    }
  }
  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }

  tabChanged(event) {
    const v = event.index;
    if (v === 0) {
      this.showFilter = false;
    } else {
      this.showFilter = true;
    }
  }
}
