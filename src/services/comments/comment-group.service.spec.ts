import { TestBed } from '@angular/core/testing';

import { CommentGroupService } from './comment-group.service';

describe('CommentGroupService', () => {
  let service: CommentGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
