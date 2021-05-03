import { TestBed } from '@angular/core/testing';

import { PostsGroupService } from './posts-group.service';

describe('PostsGroupService', () => {
  let service: PostsGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
