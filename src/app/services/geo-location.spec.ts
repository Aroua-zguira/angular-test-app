import { TestBed } from '@angular/core/testing';

import { GeoLocationService } from './geo-location';

describe('GeoLocation', () => {
  let service: GeoLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
