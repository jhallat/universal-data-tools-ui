import { TestBed } from '@angular/core/testing';

import { UdtcPageService } from './udtc-page.service';

describe('UdtcPageService', () => {
  let service: UdtcPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UdtcPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
