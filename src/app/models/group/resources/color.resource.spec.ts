import { TestBed } from '@angular/core/testing';

import { ColorResource } from './color.resource';

describe('ColorResource', () => {
  let service: ColorResource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorResource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
