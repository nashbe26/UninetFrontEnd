import { TestBed } from '@angular/core/testing';

import { AuthentifactionSuccessGuard } from './authentifaction-success.guard';

describe('AuthentifactionSuccessGuard', () => {
  let guard: AuthentifactionSuccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthentifactionSuccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
