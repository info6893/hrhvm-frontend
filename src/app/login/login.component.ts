import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SweetalertService } from '../services/sweetalert.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  fb = inject(FormBuilder)
  router = inject(Router)
  usuario!: any
  authservice = inject(AuthService)
  alertsuccessservices = inject(SweetalertService)
  form = this.fb.group({
    usuario: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })

  obtenerErrorCampoNombre(camponom: string) {
    var campo = this.form.get(camponom)
    if (campo?.hasError('required')) {
      return 'El campo es requerido';
    }
    return ''
  }


  onSubmit() {    
    this.authservice.authToken(this.form.value).pipe(
      tap(data => {        
        this.authservice.guardarToken(data); 
      }),
      catchError(error => {     
       this.alertsuccessservices.mostrarMensajeError(error.error.message)
        return of(null);
      })
    ).subscribe((data)=>{   
      if(data){
        this.router.navigate(['/admin/'])
      } 
    });
  }
}
