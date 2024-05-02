import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadinterceptoresService implements HttpInterceptor{
  seguridadServices=inject(AuthService)
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token=this.seguridadServices.obtenerToken();
    if(token){
      req=req.clone({        
        setHeaders:{
          Authorization:localStorage.getItem('tokengalenos')!
        }
      })
    }
    return next.handle(req);
  }
}
