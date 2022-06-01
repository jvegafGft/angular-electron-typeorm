import { TestBed } from '@angular/core/testing';

import { TrackRepositoryService } from './track-repository.service';

describe('TrackRepositoryService', () => {
  let service: TrackRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
