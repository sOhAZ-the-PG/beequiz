import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { haveScoreGuard } from './have-score.guard';

describe('haveScoreGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => haveScoreGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
