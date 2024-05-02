import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-auditorias',
  templateUrl: './auditorias.component.html',
  styleUrls: ['./auditorias.component.css']
})
export class AuditoriasComponent {
  datares:any;
  auditoriasServices = inject(AdminService)
  sweetservices=inject(SweetalertService)
  fb = inject(FormBuilder)
  form = this.fb.group({
    idcuenta: ['', Validators.required]
  })

  Buscar() {
    this.auditoriasServices.findauditoriabycuenta(this.form.value.idcuenta).subscribe(
      data=>{
        this.datares=data
        console.log(this.datares.length)
        if(this.datares.length>0){
          this.sweetservices.mostrarExito("Exitoso")
        }else{
          this.sweetservices.mostrarError("No se encontraron resultados.")
        }        
      },
      error => {
      
        this.sweetservices.mostrarError(error.error.message);
      }
    )
  }


}
