import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { haveCategoryGuard } from './have-category.guard';

describe('haveCategoryGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => haveCategoryGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
