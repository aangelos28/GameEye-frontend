import { TestBed } from '@angular/core/testing';

import { RedirectDataService } from './redirect-data.service';

describe('RedirectDataService', () => {
  let service: RedirectDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
