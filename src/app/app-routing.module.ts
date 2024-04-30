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
import { HoraprogramacionComponent } from './admin/horaprogramacion/horaprogramacion.component';
import { EstablecimientoComponent } from './admin/establecimiento/establecimiento.component';
import { ReportecitasComponent } from './guest/reportecitas/reportecitas.component';
import { ReportestvcitasComponent } from './guest/reportestvcitas/reportestvcitas.component';
import { Consultacitas2Component } from './guest/consultacitas2/consultacitas2.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportesgeneralComponent } from './guest/reportesgeneral/reportesgeneral.component';

const routes: Routes = [
  { path: 'consultacita', component: ReportestvcitasComponent },
  { path: 'reportecitas', component: ReportestvcitasComponent },
  { path: 'reportes', component: ReportesgeneralComponent },
  { path: 'ver', component: AuditoriasComponent },

  { path: 'inicio/reporte_anatopatologia/:id', component: ResultadosComponent },
  { path: 'login', component: LoginComponent, canActivate: [logeatedGuard] },
  {
    path: '', component: AdminpublicComponent,
    children: [
      { path: '', redirectTo: 'citas', pathMatch: 'full' },
      { path: 'citas', component: Consultacitas2Component },
      { path: 'patologica', component: AnatopatologiaComponent },
      { path: 'consultacitas', component: ReportecitasComponent },
    ]
  },
  {
    path: 'admin', component: AdminprivateComponent, canActivateChild: [authenticatedGuard],
    children: [
      { path: '', redirectTo: 'auditoria', pathMatch: 'full' },
      { path: 'auditoria', component: AuditoriasComponent },
      { path: 'establecimiento', component: EstablecimientoComponent }
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
