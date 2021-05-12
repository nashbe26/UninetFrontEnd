import { TestBed } from '@angular/core/testing';

import { UpvotesService } from './upvotes.service';

describe('UpvotesService', () => {
  let service: UpvotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpvotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
