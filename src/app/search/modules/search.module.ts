import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { BestPriceService } from '../../services/best-price.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from '../components/search.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../material-module';

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
  providers: [BestPriceService, HttpClient, DatePipe],
  exports: [SearchComponent],
})
export class SearchModule {}
