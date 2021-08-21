import { TestBed } from '@angular/core/testing';

import { NoCacheHeadersInterceptor } from './interceptor.service';

describe('InterceptorService', () => {
  let service: NoCacheHeadersInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[NoCacheHeadersInterceptor]
    });
    service = TestBed.inject(NoCacheHeadersInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
