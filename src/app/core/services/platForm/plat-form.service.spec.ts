import { TestBed } from '@angular/core/testing';

import { PlatFormService } from './plat-form.service';

describe('PlatFormService', () => {
  let service: PlatFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
