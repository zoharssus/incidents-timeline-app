import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  BASE_DOMAIN = environment.app_backend + '/incidents';
  constructor(private _http: HttpClient) { }

  getIncident(incidentId) {
    const params = {incidentId};
    return this._http.get(this.BASE_DOMAIN + '/get-incident', {params});
  }

  updateIncident(incidentId, update) {
    const body = {incidentId, update};
    this._http.post(this.BASE_DOMAIN + '/update-incident', body);
  }

  loadAllCountries() {
    return this._http.get(this.BASE_DOMAIN + '/get-countries');
  }
}
