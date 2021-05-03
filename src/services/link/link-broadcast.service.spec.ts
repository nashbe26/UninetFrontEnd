import { TestBed } from '@angular/core/testing';

import { LinkBroadcastService } from './link-broadcast.service';

describe('LinkBroadcastService', () => {
  let service: LinkBroadcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkBroadcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
