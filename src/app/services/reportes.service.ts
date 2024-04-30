import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiURL=environment.apiURL+'reportes';
  private http=inject(HttpClient)

  findreportescitas():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURL}/reportecitas`)
  }

}
