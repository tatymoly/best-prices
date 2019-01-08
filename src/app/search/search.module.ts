import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { BestPriceService } from '../shared/services/best-price.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material-module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [BestPriceService, HttpClient],
  exports: [SearchComponent],
})
export class SearchModule {}
