import { TestBed } from '@angular/core/testing';
import { TaskResource } from './task.resource';

describe('TaskResource', () => {
  let service: TaskResource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskResource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
