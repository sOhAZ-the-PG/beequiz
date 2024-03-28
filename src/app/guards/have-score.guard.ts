import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@app/services/storage.service';

export const haveScoreGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const have = storageService.haveScore();
  if (have) {
    // Authorized so return true
    return true;
  }

  // Required category id, redirect to category page
  router.navigate(['/category']);
  return false;
};
