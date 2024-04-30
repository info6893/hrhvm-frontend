import { AfterViewInit, Component, inject } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { ReportesService } from 'src/app/services/reportes.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as moment from 'moment';
@Component({
  selector: 'app-reportestvcitas',
  templateUrl: './reportestvcitas.component.html',
  styleUrls: ['./reportestvcitas.component.css']
})
export class ReportestvcitasComponent implements AfterViewInit{
  ver:boolean=true;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'es',
    plugins: [dayGridPlugin, interactionPlugin],
    firstDay: 1,
    timeZone: 'UTC',
 
  };

  reporteservices = inject(ReportesService)
  dataCalendario: any[] = []
  options?: CalendarOptions;
  eventsData: any[] = [];
  eventsDatafile: any[] = [];
  events: any[] = [];
  nombreServiciosDisponibles: any[] = []

  private actualizarCadaCincoSegundos() {
    setInterval(() => {
      window.location.reload();
    }, 60000); // 5000 milisegundos = 5 segundos
  }

  ngAfterViewInit(): void {
    this.actualizarCadaCincoSegundos()
    console.log(moment().toISOString())
    this.reporteservices.findreportescitas().subscribe(data => {
      this.dataCalendario = data.filter(data =>
        data.Citas_Libres > 0 &&
        !(data.Nombre_Servicios.includes("CRED") ||
          data.Nombre_Servicios.includes("TELESALUD") ||
          data.Nombre_Servicios.includes("INMUNIZACIONES") ||
          data.Nombre_Servicios.includes("HEMATOLOGIA")) ||
          data.Nombre_Servicios.includes("CERTIFICADO") ||
          data.Nombre_Servicios.includes("DISCAPACIDAD")
      );
      this.nombreServiciosDisponibles = Object.values(this.dataCalendario.reduce((acc, obj) => {
        acc[obj.Nombre_Servicios] = obj;
        return acc;
      }, {}));
      for (const item of this.dataCalendario) {
        this.eventsData.push({ title: item.Citas_Libres + ' - ' + item.Nombre_Servicios, date: item.Fecha });
      }
      this.eventsDatafile = this.eventsData
      this.ver=false
    })
  }

}
