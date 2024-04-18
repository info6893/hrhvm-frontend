import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = environment.apiURL + 'auth';
  private readonly llavetoken = 'tokengalenos';
  private http = inject(HttpClient)


  autenticado():Observable<Boolean>{
    const token=localStorage.getItem(this.llavetoken);
    if (!token){
      return of(false)
    }
    var parts = token?.split('.');
    if (parts){
      let decodedPayload = atob(parts[1]);
      let payloadObject = JSON.parse(decodedPayload);
      let expiracionfecha = new Date(payloadObject.exp*1000)
      if(expiracionfecha<=new Date()){      
        return of(false);
      }
    }  
    return of(true);
  }

  authToken(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}`, usuario)
  }

  guardarToken(data: string) {
    localStorage.setItem(this.llavetoken, data);
  }
  
  logout(){
    localStorage.removeItem(this.llavetoken);
  }
}
