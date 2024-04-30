import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AdminService } from 'src/app/services/admin.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.css']
})
export class EstablecimientoComponent implements OnInit{
  adminservices=inject(AdminService)
  
  sweetservices=inject(SweetalertService)
  dataEstablecimiento:any;
  ngOnInit(): void {
    this.adminservices.findEstablecimientos().subscribe(
      data=>{     
        this.dataEstablecimiento=data;
      }
    );    
  }
  fb = inject(FormBuilder)
  form = this.fb.group({
    idAtencion: ['', Validators.required],
    IdEstablecimientoOrigen:['', Validators.required],
    NroReferenciaOrigen:['']
  })


  Modificar() {
    
    this.adminservices.updateEstablecimiento(this.form.value).subscribe(data=>{
      console.log(data)
      if(data[0]>0){
        this.form.reset();
        this.sweetservices.mostrarExito("Actualizo");
      }else{
        this.sweetservices.mostrarError("No se existe cuenta.");
      }
      
    })
  }
  
}
