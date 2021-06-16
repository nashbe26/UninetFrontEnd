import { TestBed } from '@angular/core/testing';

import { HomeworkListService } from './homework-list.service';

describe('HomeworkListService', () => {
  let service: HomeworkListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeworkListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
