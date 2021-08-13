import { TestBed } from '@angular/core/testing';

import { NavSideService } from './nav-side.service';

describe('NavSideService', () => {
  let service: NavSideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavSideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
