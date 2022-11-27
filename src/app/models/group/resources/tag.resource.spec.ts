import { TestBed } from '@angular/core/testing';

import { TagResource } from './tag.resource';

describe('TagResource', () => {
  let service: TagResource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagResource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
