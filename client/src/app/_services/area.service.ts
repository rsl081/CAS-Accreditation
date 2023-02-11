import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, mergeMap, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArea, IAreaRoot } from '../shared/models/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  baseURL = environment.apiUrl;
  updateNeeded = new Subject<void>(); 
  // for faculty
  lastInUpdateNeeded = new Subject<IArea>(); 
  lastEditUpdateNeeded = new Subject<IArea>(); 
  
  constructor(private http: HttpClient) { }

  addArea(body: {}){
    return this.http.post(this.baseURL+'areas', body);
  }

  deleteArea(id: number){
    return this.http.delete(this.baseURL+'areas/'+id);
  }

  updateArea(id: number, body: {}){
    return this.http.put(this.baseURL+'areas/edit/'+id, body);
  }

  getAreasByLevelId(levelId: string){
    return this.http.get<IAreaRoot>(this.baseURL+'areas?levelId='+levelId);
  }
  
  getAreasByFacultyId(levelId: string, facultyId: string){
    return this.getAreasByLevelId(levelId).pipe(
      mergeMap(area => area.data),
      filter(data => data.facultyUserId == facultyId)
    );
  }

  getOtherAreas(levelId: string, facultyUserId: string){
    return this.getAreasByLevelId(levelId).pipe(
       mergeMap(area => area.data),
       filter(data => data.facultyUserId !== facultyUserId)
     );
  }

  getAllAreas(){
    return this.http.get<IAreaRoot>(this.baseURL+'areas');
  }
}
