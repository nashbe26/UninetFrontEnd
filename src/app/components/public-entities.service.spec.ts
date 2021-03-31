import { TestBed } from '@angular/core/testing';

import { PublicEntitiesService } from './public-entities.service';

describe('PublicEntitiesService', () => {
  let service: PublicEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
