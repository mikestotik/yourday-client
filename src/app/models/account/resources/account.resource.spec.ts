import { TestBed } from '@angular/core/testing';
import { AccountResource } from './account.resource';

describe('AccountResource', () => {
  let service: AccountResource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountResource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
