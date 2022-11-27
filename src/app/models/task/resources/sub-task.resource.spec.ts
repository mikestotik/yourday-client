import { TestBed } from '@angular/core/testing';
import { SubTaskResource } from './sub-task.resource';

describe('SubTaskResource', () => {
  let service: SubTaskResource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubTaskResource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
