import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';
import { CoverDTO } from '../models/cover-dto';
import { Cover } from '../models/cover.model';

describe('BaseService', () => {
  let service: BaseService<Cover, CoverDTO>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
