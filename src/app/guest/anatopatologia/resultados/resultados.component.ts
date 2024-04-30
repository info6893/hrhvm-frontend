import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  dataResultados:any=[]
  dataResulExamen:any=[]
  objetoResultados:any
  id: any="";
  route=inject(ActivatedRoute)
  pacienteServices=inject(PacienteService)

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.get('id')){
        const idParam = params.get('id');
    
        this.cargarResultados(idParam)
      }      
      console.log(this.id);
    });
  }

  cargarResultados(id:any){
    this.pacienteServices.findByDniResultadosAnatoPatologiaByIdMovimiento(id).subscribe(data=>{
      console.log(data)
      this.dataResultados=data      
     // let partes = this.dataResultados.resultadoAnalisis.split("\\"); 
      if (this.dataResultados[0].resultadoAnalisis){
       console.log("entro")
        let partes =this.dataResultados[0].resultadoAnalisis.split("\\")
        this.objetoResultados = {
          fechaRecepcion: partes[0],
          identificador: partes[1],
          descripcion: partes[2],
          muestra: partes[3],
          fechadetalles: partes[4],
          macroscopia: partes[5],
          microscopia:partes[6],
          diagnostico:partes[7],
          observaciones:partes[8]
        };
        console.log(this.objetoResultados)
      }

    }) 
  }

  esCitologiaEspecial(item: any): boolean {
    return item.NombreExamen === 'CITOLOGÍA ESPECIAL';
  }
  
  esBaf(item: any): boolean {
    return item.NombreExamen === 'ESTUDIO CITO HISTOLÓGICO INMEDIATO DE ASPIRADO DE AGUJA FINA(BAAF), PARA DETERMINAR ADECUACIÓN DE LAS MUESTRAS PARA REALIZAR DIAGNÓSTICO';
  }
}
