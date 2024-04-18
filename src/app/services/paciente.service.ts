import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  private apiURL=environment.apiURL+'anatopatologia';
  private http=inject(HttpClient)


  DatosPatologiaxPaciente(dni:any,fechanac:any){
    return this.http.get(`${this.apiURL}/patologia/${dni}/${fechanac}`)
  }

  findcitaxdni(dni:any,fechanac:any){
    return this.http.get(`${this.apiURL}/citas/${dni}/${fechanac}`)
  }
  findByDniResultadosAnatoPatologiaByIdMovimiento(idmovimiento:any){
    return this.http.get(`${this.apiURL}/patolo/resultados/${idmovimiento}`)
  }

}
