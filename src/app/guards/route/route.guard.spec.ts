import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RouteGuard } from './route.guard';

describe('RouteGuard', () => {
  let guard: RouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(RouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
