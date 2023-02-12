import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISysImpleOutptRoot } from '../shared/models/sysimpleoutpt';

@Injectable({
  providedIn: 'root',
})
export class SysimpleoutptService {
  baseURL = environment.apiUrl;
  updateNeeded = new Subject<void>();

  constructor(private http: HttpClient) {}

  addSysImpleOutpt(body: {}) {
    return this.http.post(this.baseURL + 'systems', body);
  }

  updateSysImpleOutpt(id: string, body: {}) {
    return this.http.put(this.baseURL + 'systems/' + id, body);
  }

  deleteSysImpleOutpt(id: string) {
    return this.http.delete(this.baseURL + 'systems/' + id);
  }

  getSysImpleOutptsByParameterId(parameterId: string) {
    return this.http.get<ISysImpleOutptRoot>(
      this.baseURL + 'systems?paramId=' + parameterId
    );
  }
}