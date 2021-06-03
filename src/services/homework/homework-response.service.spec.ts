import { TestBed } from '@angular/core/testing';

import { HomeworkResponseService } from './homework-response.service';

describe('HomeworkResponseService', () => {
  let service: HomeworkResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeworkResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
