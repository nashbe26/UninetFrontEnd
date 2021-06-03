import { TestBed } from '@angular/core/testing';

import { CoursServicesService } from './cours-services.service';

describe('CoursServicesService', () => {
  let service: CoursServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
