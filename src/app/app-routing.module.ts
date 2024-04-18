import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpublicComponent } from './layout/public/adminpublic/adminpublic.component';
import { AnatopatologiaComponent } from './guest/anatopatologia/anatopatologia.component';
import { ConsultacitaComponent } from './guest/consultacita/consultacita.component';
import { ResultadosComponent } from './guest/anatopatologia/resultados/resultados.component';
import { LoginComponent } from './login/login.component';
import { AdminprivateComponent } from './layout/admin/adminprivate/adminprivate.component';
import { AuditoriasComponent } from './admin/auditorias/auditorias.component';
import { logeatedGuard } from './guards/logeated.guard';
import { authenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  {path:'patologiaresultados/:id',component:ResultadosComponent},
  {path:'login',component:LoginComponent,canActivate:[logeatedGuard]},
  {
    path: '', component: AdminpublicComponent,
    children: [
      { path: '', redirectTo: 'citas', pathMatch: 'full' },
      { path: 'citas', component: ConsultacitaComponent },
      { path: 'patologica', component: AnatopatologiaComponent },
    ]
  },
  {
    path:'admin',component:AdminprivateComponent,canActivateChild:[authenticatedGuard],
    children:[
      {path:'', redirectTo:'auditoria',pathMatch:'full'},
      {path:'auditoria',component:AuditoriasComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
