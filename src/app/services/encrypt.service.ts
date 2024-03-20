import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  private readonly k = 'notimetodie777';

  // Methods for the encrypt and decrypt Using AES
  encrypt(plaintext: string): any {
    return CryptoJS.AES.encrypt(plaintext, this.k).toString();
  }
  decrypt(encrypted: string) {
    return CryptoJS.AES.decrypt(encrypted, this.k).toString(CryptoJS.enc.Utf8);
  }
}
