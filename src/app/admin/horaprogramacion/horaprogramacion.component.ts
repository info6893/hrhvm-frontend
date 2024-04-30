import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-horaprogramacion',
  templateUrl: './horaprogramacion.component.html',
  styleUrls: ['./horaprogramacion.component.css']
})
export class HoraprogramacionComponent implements OnInit{

  dataEstablecimiento:any;
  adminservices=inject(AdminService)
  selectedCar: any;

  cars = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab' },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
  ];

  ngOnInit(): void {
    this.adminservices.findEstablecimientos().subscribe(
      data=>{
        this.dataEstablecimiento=data;
      }
    );
  }
  Modificar() {
  throw new Error('Method not implemented.');
  }
  fb = inject(FormBuilder)
  form = this.fb.group({
    idcuenta: ['', Validators.required],
    idconsultorio: ['', Validators.required]
  })
}
