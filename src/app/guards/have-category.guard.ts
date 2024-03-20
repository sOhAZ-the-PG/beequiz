import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@services/storage.service';

export const haveCategoryGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const have = storageService.haveCategory();
  if (have) {
    // Authorized so return true
    return true;
  }

  // Required category id, redirect to category page
  router.navigate(['/category']);
  return false;
};
