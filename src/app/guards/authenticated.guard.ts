import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  
  const hasToken=()=> {
    return !!localStorage.getItem('tokengalenos');
  }
  if(hasToken()){

    const authServices=inject(AuthService)
    const token=localStorage.getItem('tokengalenos')!
    const dataToken=JSON.parse(atob(token.split('.')[1]))
    const fechaexpiracion = new Date(dataToken.exp*1000);
   
    if(new Date()>=fechaexpiracion){
      authServices.logout()
      return false;
    }
    if (localStorage.getItem('tokengalenos')) {
      return true;
    } else {
      router.navigate(['/login']); 
      return false;
    }
  }
 else{
  router.navigate(['/login']);
  return false
 }
};
