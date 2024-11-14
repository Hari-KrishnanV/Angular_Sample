import { TestBed } from '@angular/core/testing';

import { StatesInfoService } from './states-info.service';

describe('StatesInfoService', () => {
  let service: StatesInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatesInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
