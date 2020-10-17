import { TestBed } from '@angular/core/testing';

import { UserCreatedGuard } from './user-created.guard';

describe('UserCreatedGuard', () => {
  let guard: UserCreatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserCreatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
