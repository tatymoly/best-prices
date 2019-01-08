import { TestBed } from '@angular/core/testing';

import { BestPriceService } from './best-price.service';

describe('BestPriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BestPriceService = TestBed.get(BestPriceService);
    expect(service).toBeTruthy();
  });
});
