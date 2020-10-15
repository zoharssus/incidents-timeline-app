import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'incident-timeline-ui';

  constructor(private incidentService: IncidentService) {}

  ngOnInit() {

  }
}
