import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { SweetalertService } from '../../services/sweetalert.service';
import { EncriptacionService } from 'src/app/services/encriptacion.service';

@Component({
  selector: 'app-anatopatologia',
  templateUrl: './anatopatologia.component.html',
  styleUrls: ['./anatopatologia.component.css']
})
export class AnatopatologiaComponent {
  encriptacionservices=inject(EncriptacionService)
  sweetservices=inject(SweetalertService)
  router = inject(Router)
  datageneral: any = []
  pacienteServices = inject(PacienteService)
  fb = inject(FormBuilder)
  form = this.fb.group({
    dni: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(8)]],
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


  enviarData() {
    if (this.form.value.fechanac) {
      const dni = this.form.value.dni
      const fechanac = new Date(this.form.value.fechanac)
      const fechaSolo = fechanac.toISOString().split('T')[0];
      this.pacienteServices.DatosPatologiaxPaciente(dni, fechaSolo).subscribe(data => {    
        this.datageneral = data
        this.datageneral.length>0 ? this.sweetservices.mostrarExito("Validado") : this.sweetservices.mostrarError("No se encontraron resultados.")      
      })
    }
  }
  

}
