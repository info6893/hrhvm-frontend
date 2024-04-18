import { NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultacitaComponent } from './guest/consultacita/consultacita.component';

import { DateFnsModule,DateFnsAdapter } from '@angular/material-date-fns-adapter';
import {es} from 'date-fns/locale'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatCommonModule, MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import { ResultadosComponent } from './guest/anatopatologia/resultados/resultados.component';
import { LoginComponent } from './login/login.component';
import { AuditoriasComponent } from './admin/auditorias/auditorias.component';
import { AdminprivateComponent } from './layout/admin/adminprivate/adminprivate.component';


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
    DateFnsModule
  ],
  providers: [
    {provide:DateAdapter,useClass:DateFnsAdapter},
    {provide:MAT_DATE_LOCALE,useValue:es},
    {provide:MAT_DATE_FORMATS,useValue:DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
