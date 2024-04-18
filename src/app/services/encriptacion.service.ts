import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {

  encrypt(text: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const hex = text.charCodeAt(i).toString(16);
      result += hex;
    }
    return result;
  }

  decrypt(hexString: string): string {
    let result = '';
    for (let i = 0; i < hexString.length; i += 2) {
      const hex = parseInt(hexString.substr(i, 2), 16);
      result += String.fromCharCode(hex);
    }
    return result;
  }
}
