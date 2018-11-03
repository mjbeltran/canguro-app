import { TestBed, inject } from '@angular/core/testing';

import { NannyService } from './nanny.service';

describe('NannyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NannyService]
    });
  });

  it('should be created', inject([NannyService], (service: NannyService) => {
    expect(service).toBeTruthy();
  }));
});
