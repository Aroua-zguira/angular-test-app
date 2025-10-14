import { TestBed } from '@angular/core/testing';

import { GeoLocation } from './geo-location';

describe('GeoLocation', () => {
  let service: GeoLocation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoLocation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
