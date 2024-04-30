import { Component, OnInit, inject, AfterViewInit, Inject } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { ReportesService } from 'src/app/services/reportes.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-reportecitas',
  templateUrl: './reportecitas.component.html',
  styleUrls: ['./reportecitas.component.css']
})



export class ReportecitasComponent implements AfterViewInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'es', 
    plugins: [dayGridPlugin, interactionPlugin],    
    firstDay: 1,
  };
  ver:boolean=true;
  reporteservices = inject(ReportesService)
  dataCalendario: any[] = []  
  options?: CalendarOptions;
  eventsData: any[] = [];
  eventsDatafile:any[] = [ ];
  events: any[] = [ ];
  nombreServiciosDisponibles:any[]=[]
  dialog=inject(MatDialog) 

  verProgramacion(item:any) {
    let consultorioseleccionado=this.dataCalendario.filter(data=>data.Nombre_Servicios.includes(item.Nombre_Servicios))
    console.log(consultorioseleccionado)
    const dialogRef = this.dialog.open(DialogContentExampleDialog,{
      data:consultorioseleccionado,
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngAfterViewInit(): void {
   
    this.reporteservices.findreportescitas().subscribe(data => {      
      this.dataCalendario = data.filter(data =>
        data.Citas_Libres > 0 &&
        !(data.Nombre_Servicios.includes("CRED") ||
          data.Nombre_Servicios.includes("TELESALUD") ||
          data.Nombre_Servicios.includes("INMUNIZACIONES") ||
          data.Nombre_Servicios.includes("HEMATOLOGIA"))
      );
      this.nombreServiciosDisponibles = Object.values(this.dataCalendario.reduce((acc, obj) => {
        acc[obj.Nombre_Servicios] = obj;
        return acc;
    }, {}));
      for (const item of this.dataCalendario) {   
          this.eventsData.push({ title: item.Citas_Libres+' - '+item.Nombre_Servicios, date: item.Fecha });      
      }
      this.eventsDatafile=this.eventsData
      this.ver=false
    })

  
  }

  enviarServicio(_t5: any) {
    if (_t5.seleccionado) {
      console.log("seleccionado"+_t5.Nombre_Servicios)
      console.log(_t5.Nombre_Servicios)
      this.dataCalendario=this.dataCalendario.filter(data=>data.Nombre_Servicios.includes(_t5.Nombre_Servicios))
      console.log(this.dataCalendario)
    }
    else{
      console.log("se deselecciona"+_t5.Nombre_Servicios)
    }
  }

  handleDateClick(arg: any) {
    //alert('date click! ' + arg.dateStr)
  }
}



@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'reportedetalle.html',
  standalone: true,
  imports:[MatDialogModule,MatButtonModule,CommonModule],
  styleUrls: ['./reportedetallecss.css']
})
export class DialogContentExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}