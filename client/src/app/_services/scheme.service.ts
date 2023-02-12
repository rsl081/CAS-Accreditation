import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISchemeRoot } from '../shared/models/scheme';

@Injectable({
  providedIn: 'root',
})
export class SchemeService {

  baseURL = environment.apiUrl;
  updateNeeded = new Subject<void>();

  constructor(private http: HttpClient) {}

  addScheme(body: {}) {
    return this.http.post(this.baseURL + 'schemes', body);
  }

  updateScheme(id: string, body: {}) {
    return this.http.put(this.baseURL + 'schemes/' + id, body);
  }

  deleteScheme(id: string) {
    return this.http.delete(this.baseURL + 'schemes/' + id);
  }

  getSchemesBySysImpleOutptId(sysImpOutptId: string) {
    return this.http.get<ISchemeRoot>(
      this.baseURL + 'schemes?sysImpOutptId=' + sysImpOutptId
    );
  }
  
}
