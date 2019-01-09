import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { BestPriceService } from '../shared/services/best-price.service';

export interface CountryGroup {
  letter: string;
  names;
}
export const _filterCity = (item: string, value: string) => {
  const filterValue = value.toLowerCase();
  return item.toLowerCase().includes(filterValue);
};

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  countryForm: FormGroup = this.fb.group({
    originGroup: '',
    destinationGroup: '',
  });

  destinationForm: FormGroup = this.fb.group({
    countryGroup: '',
  });

  countryGroups: CountryGroup[] = [
    {
      letter: 'AR',
      names: [
        {
          city: 'Buenos Aires',
          iataCityCode: 'BAS',
        },
        {
          city: 'Mendoza',
          iataCityCode: 'MDZ',
        },
      ],
    },
    {
      letter: 'BR',
      names: [
        {
          city: 'Rio de Janeiro',
          iataCityCode: 'RIO',
        },
        {
          city: 'Sao Pablo',
          iataCityCode: 'SAO',
        },
      ],
    },
    {
      letter: 'CL',
      names: [
        {
          city: 'Santiago de Chile',
          iataCityCode: 'SCL',
        },
      ],
    },
    {
      letter: 'CO',
      names: [
        {
          city: 'Bogotá',
          iataCityCode: 'BOG',
        },
        {
          city: 'Medellín',
          iataCityCode: 'MDE',
        },
      ],
    },
    {
      letter: 'ES',
      names: [
        {
          city: 'Madrid',
          iataCityCode: 'MAD',
        },
        {
          city: 'Barcelona',
          iataCityCode: 'BCN',
        },
      ],
    },
    {
      letter: 'MX',
      names: [
        {
          city: 'Ciudad de México',
          iataCityCode: 'MEX',
        },
      ],
    },
    {
      letter: 'PE',
      names: [
        {
          city: 'Lima',
          iataCityCode: 'LIM',
        },
      ],
    },
  ];

  countryGroupOptions: Observable<CountryGroup[]>;
  destinationGroupOpt: Observable<CountryGroup[]>;

  travelTypes: string[] = ['Ida y Regreso', 'Solo Ida'];
  travelTpye: string;

  country: string;
  destination: string;
  returnDate: Boolean = false;
  searchOptions: Object = {
    country: this.country,
    destination: this.destination,
  };
  myParams;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bestPriceService: BestPriceService
  ) {}

  ngOnInit() {
    this.getUrlParams();
    this.getCountryGroupOptions();
  }

  getUrlParams() {
    this.route.queryParams.subscribe(params => {
      this.myParams = params;
      this.sendParamsOptions();
    });
  }

  getCountryGroupOptions() {
    // tslint:disable-next-line:no-non-null-assertion
    this.countryGroupOptions = this.countryForm
      .get('originGroup')!
      .valueChanges.pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
    // tslint:disable-next-line:no-non-null-assertion
    this.countryGroupOptions = this.countryForm
      .get('destinationGroup')!
      .valueChanges.pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  sendParamsOptions() {
    this.bestPriceService.searchBestPrices(this.myParams).subscribe(res => {
      console.log(res);
    });
  }

  private _filterGroup(value: string): CountryGroup[] {
    if (value) {
      return this.countryGroups
        .map(group => {
          return {
            letter: group.letter,
            names: group.names.filter(
              item =>
                _filterCity(item.city, value) ||
                _filterCity(item.iataCityCode, value)
            ),
          };
        })
        .filter(group => group.names.length > 0);
    }
    return this.countryGroups;
  }
}
