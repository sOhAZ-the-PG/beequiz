import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@services/storage.service';

export const noauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const logged = storageService.isLoggedIn();
  if (!logged) {
    // Authorized so return true
    return true;
  }

  // Already logged in , redirect to category page
  router.navigate(['/category']);
  return false;
};
