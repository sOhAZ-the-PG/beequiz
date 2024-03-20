import { Injectable } from '@angular/core';
import { EncryptService } from '@services/encrypt.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private encryptService: EncryptService) {}

  public static readonly USER_KEY = 'user-auth';
  public static readonly CATEGORY_KEY = 'category';

  clean(): void {
    sessionStorage.clear();
  }

  public saveUser(user: any): void {
    sessionStorage.removeItem(StorageService.USER_KEY);
    sessionStorage.setItem(
      StorageService.USER_KEY,
      this.encryptService.encrypt(JSON.stringify(user))
    );
  }

  public getUser(): any {
    const user = sessionStorage.getItem(StorageService.USER_KEY);
    return user ? JSON.parse(this.encryptService.decrypt(user)) : null;
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem(StorageService.USER_KEY) !== null;
  }

  public saveCategory(category: any): void {
    sessionStorage.removeItem(StorageService.CATEGORY_KEY);
    sessionStorage.setItem(
      StorageService.CATEGORY_KEY,
      this.encryptService.encrypt(JSON.stringify(category))
    );
  }

  public getCategory(): any {
    const category = sessionStorage.getItem(StorageService.CATEGORY_KEY);
    return category ? JSON.parse(this.encryptService.decrypt(category)) : null;
  }

  public haveCategory(): boolean {
    return sessionStorage.getItem(StorageService.CATEGORY_KEY) !== null;
  }
}
