import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  incidentId;
  priority: string;
  status: string;
  country: object;
  createdAt: string;
  operations : any[];
  

  originalPriority: string;
  originalStatus: string;
  originalCountry: string;

  selectedPriority: string;
  selectedStatus: string;
  selectedCountry: string;

  newOperations = [];

  incidentProps = ['Priority', 'Status', 'Country'];
  priorityOptions = ['Low', 'Medium', 'High', 'Critical'];
  statusOptions = ['Open', 'Closed'];
  
  countries;
  constructor(
    private incidentService: IncidentService,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.incidentId = this.activatedRoute.snapshot.params.id;
    this.getIncidentData(this.incidentId);
    this.editIncidentTimeline();
    this.loadCountriesEmojies();
  }

  getIncidentData(id) {
    this.incidentService.getIncident(id)
    .subscribe((incidentData : any) => {
      const {status, priority, country, operations} = incidentData;
      this.status = status;
      this.priority = priority;
      this.country = country;
      
      this.originalStatus = status;
      this.originalPriority = priority;
      this.originalCountry = country;

      this.operations = operations;
    });
  }

  updatePriority(selectedPriority) {
    this.selectedPriority = selectedPriority;
  }

  updateStatus(selectedStatus) {
    this.selectedStatus = selectedStatus;
  }

  updateCountry(selectedCountry) {
    this.selectedCountry = selectedCountry;
  }

  updateIncident() {
    if (this.originalPriority !== this.selectedPriority) {
      this.newOperations.push({
        type: 'priority',
        from: this.originalPriority,
        to: this.selectedPriority,
        date: new Date()
      });
    }
    if (this.originalStatus !== this.selectedStatus) {
      this.newOperations.push({
        type: 'status',
        from: this.originalStatus,
        to: this.selectedStatus,
        date: new Date()
      });
    }
    if (this.originalCountry !== this.selectedCountry) {
      this.newOperations.push({
        type: 'country',
        from: this.originalCountry,
        to: this.selectedCountry,
        date: new Date()
      });
    }

    const update = {
      priority: this.selectedPriority,
      status: this.selectedStatus,
      country: this.selectedCountry,
      operations: [...this.operations, ...this.newOperations]
    };
    this.incidentService.updateIncident(this.incidentId, update);
  }

  editIncidentTimeline() {
    this.operations = this.operations.map(operation => {
      const newOp = operation;
      if (operation.type === 'country') {
        newOp.description = `Incident location changed from <span class="country"><img src="{{countries[${operation.from}].emoji}}"></span> to <span class="country"><img src="{{countries[${operation.to}].emoji}}"></span>`;  
      }
      else {
        newOp.description = `Incident ${operation.type} changed from <span class="${operation.from}">${operation.from}</span> to <span class="${operation.to}">${operation.to}</span>`;
      }
      return newOp;
    });
  }

  loadCountriesEmojies() {
    this.incidentService.loadAllCountries()
    .subscribe(countriesData => {
      this.countries = countriesData;
    });
  }
}
