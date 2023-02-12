import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IParameterRoot } from '../shared/models/parameter';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  baseURL = environment.apiUrl;
  updateNeeded = new Subject<void>(); 
  
  constructor(private http: HttpClient) { }

  addParameter(body: {}){
    return this.http.post(this.baseURL+"params", body);
  }
  
  updateParameter(id: string, body: {}){
    return this.http.put(this.baseURL+"params/"+id, body);
  }

  deleteParameter(id: string){
    return this.http.delete(this.baseURL+"params/"+id);
  }
  
  getParametersByAreaId(areaId: string){
    return this.http.get<IParameterRoot>(this.baseURL+'params?areaId='+areaId)
  }
}
