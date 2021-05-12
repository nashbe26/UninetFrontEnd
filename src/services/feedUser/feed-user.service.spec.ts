import { TestBed } from '@angular/core/testing';

import { FeedUserService } from './feed-user.service';

describe('FeedUserService', () => {
  let service: FeedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
