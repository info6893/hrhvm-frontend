import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiURL=environment.apiURL+'admin';
  private http=inject(HttpClient)

  findauditoriabycuenta(id:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURL}/auditoria/${id}`)
  }

  findEstablecimientos():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURL}/establecimientos`)
  }

  updateEstablecimiento(data:any):Observable<any>{
    return this.http.put<any>(`${this.apiURL}/establecimiento`,data)
  }

}
