import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


import { SweetalertService } from '../../services/sweetalert.service';
import { PacienteService } from '../../services/paciente.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Formato de fecha al analizar entradas de usuario
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Formato de fecha para mostrar en campos de entrada
    monthYearLabel: 'MM YYYY', // Formato de mes y año para etiquetas de selector de mes y año
    dateA11yLabel: 'DD/MM/YYYY', // Formato de fecha para accesibilidad
    monthYearA11yLabel: 'MM YYYY', // Formato de mes y año para accesibilidad en el selector de mes y año
  },
};

@Component({
  selector: 'app-consultacita',
  templateUrl: './consultacita.component.html',
  styleUrls: ['./consultacita.component.css'], 
})
export class ConsultacitaComponent {
  sweetservices=inject(SweetalertService)
  datageneral: any = []
  pacienteServices=inject(PacienteService)
  fb = inject(FormBuilder)
  form = this.fb.group({
    dni: ['', [ Validators.required,Validators.pattern(/^\d+$/),Validators.maxLength(8)]],
    fechanac: ['', Validators.required]
  })

  obtenerErrorCampoNombre(camponom: string) {
    var campo = this.form.get(camponom)
    if (campo?.hasError('required')) {
      return 'El campo es requerido';
    }
    if (campo?.hasError('pattern')) {
      return 'Solo Numeros';
    }
    if (campo?.hasError('minlength')) {
      return 'Tiene que ser 8 caracteres.';
    }
    return ''
  }


  enviarData(){   
    if(this.form.value.fechanac){
      const dni=this.form.value.dni
      const fechanac=new Date(this.form.value.fechanac)
      const fechaSolo = fechanac.toISOString().split('T')[0];

      this.pacienteServices.findcitaxdni(dni,fechaSolo).subscribe(data=>{
        this.datageneral=data 
        this.datageneral.length>0 ? this.sweetservices.mostrarExito("Validado") : this.sweetservices.mostrarError("No se encontraron resultados.")      
      })
    }
  }



}
