import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { NavpublicComponent } from './layout/public/navpublic/navpublic.component';
import { NavComponent } from './layout/admin/nav/nav.component';
import { AnatopatologiaComponent } from './guest/anatopatologia/anatopatologia.component';
import { CardComponent } from './utils/card/card.component';
import { AdminpublicComponent } from './layout/public/adminpublic/adminpublic.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ConsultacitaComponent } from './guest/consultacita/consultacita.component';

import { DateFnsModule,DateFnsAdapter } from '@angular/material-date-fns-adapter';
import {es} from 'date-fns/locale'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatCommonModule, MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import { ResultadosComponent } from './guest/anatopatologia/resultados/resultados.component';
import { LoginComponent } from './login/login.component';
import { AuditoriasComponent } from './admin/auditorias/auditorias.component';
import { AdminprivateComponent } from './layout/admin/adminprivate/adminprivate.component';
import { HoraprogramacionComponent } from './admin/horaprogramacion/horaprogramacion.component';


import { NgSelectModule } from '@ng-select/ng-select';
import { EstablecimientoComponent } from './admin/establecimiento/establecimiento.component';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReportecitasComponent } from './guest/reportecitas/reportecitas.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReportestvcitasComponent } from './guest/reportestvcitas/reportestvcitas.component';
import { Consultacitas2Component } from './guest/consultacitas2/consultacitas2.component';
import { NavsidebarpublicComponent } from './layout/public/navsidebarpublic/navsidebarpublic.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReportesgeneralComponent } from './guest/reportesgeneral/reportesgeneral.component';
import { SeguridadinterceptoresService } from './services/seguridadinterceptores.service';
import { PaginaprincipalComponent } from './admin/paginaprincipal/paginaprincipal.component';
export const DATE_FORMATS:MatDateFormats={
  parse:{dateInput:'dd/MM/yyyy'},
  display:{
    dateInput:'dd/MM/yyyy',
    monthYearLabel:'MMM yyyy',
    dateA11yLabel:'LL',
    monthYearA11yLabel:'yyyy'
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavpublicComponent,
    NavComponent,
    AnatopatologiaComponent,
    CardComponent,
    AdminpublicComponent,
    ConsultacitaComponent,
    ResultadosComponent,
    LoginComponent,
    AuditoriasComponent,
    AdminprivateComponent,
    HoraprogramacionComponent,
    EstablecimientoComponent,
    ReportecitasComponent,
    ReportestvcitasComponent,
    Consultacitas2Component,
    NavsidebarpublicComponent,
    NotFoundComponent,
    ReportesgeneralComponent,
    PaginaprincipalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatCommonModule,
    DateFnsModule,
    NgSelectModule,
    FormsModule,
    NgxMatSelectSearchModule,
    FullCalendarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {provide:DateAdapter,useClass:DateFnsAdapter},
    {provide:MAT_DATE_LOCALE,useValue:es},
    {provide:MAT_DATE_FORMATS,useValue:DATE_FORMATS},
    {provide:HTTP_INTERCEPTORS,useClass:SeguridadinterceptoresService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
