import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { ToastService } from '@services/toast.service';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const toastService = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (router.url !== '/login' && err.status === 401) {
        storageService.logOut();
        toastService.add('Session expired!');
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
