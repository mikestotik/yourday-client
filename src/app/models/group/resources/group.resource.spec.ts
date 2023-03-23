import { TestBed } from '@angular/core/testing';
import { GroupResource } from './group.resource';


describe('GroupResource', () => {
  let service: GroupResource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupResource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
