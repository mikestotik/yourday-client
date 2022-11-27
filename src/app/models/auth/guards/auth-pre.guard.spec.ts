import { TestBed } from '@angular/core/testing';

import { AuthPreGuard } from './auth-pre.guard';

describe('AuthPreGuard', () => {
  let guard: AuthPreGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPreGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
