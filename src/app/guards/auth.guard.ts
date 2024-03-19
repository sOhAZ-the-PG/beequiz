import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@app/services/storage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const logged = storageService.isLoggedIn();
  if (logged) {
    // Authorized so return true
    return true;
  }

  // Not logged in , redirect to login page
  router.navigate(['/login']);
  return false;
};
