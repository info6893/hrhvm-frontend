import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const administradorguardGuard: CanActivateFn = (childRoute, state) => {
  const router = inject(Router)
  const hasToken=()=> {
    return !!localStorage.getItem('tokengalenos');
  }
  if(hasToken()){
    let valida:boolean=false;
    const authServices=inject(AuthService)
    valida=authServices.esAdministrador()
    if(valida){
      return true;
    }else{
      router.navigate(['/admin']); 
      return false;
    }
  }
 else{
  router.navigate(['/login']);
  return false
 }
};
