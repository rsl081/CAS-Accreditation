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

  deleteArea(id: string){
    return this.http.delete(this.baseURL+'areas/'+id);
  }

  updateArea(id: string, body: {}){
    return this.http.put(this.baseURL+'areas/edit/'+id, body);
  }

  getAreasByKeywordId(keywordId: string){
    return this.http.get<IAreaRoot>(this.baseURL+'areas?keywordId='+keywordId);
  }
  
  getAreasByFacultyId(keywordId: string, facultyId: string){
    return this.getAreasByKeywordId(keywordId).pipe(
      mergeMap(area => area.data),
      filter(data => data.facultyUserId == facultyId)
    );
  }

  getOtherAreas(keywordId: string, facultyUserId: string){
    return this.getAreasByKeywordId(keywordId).pipe(
       mergeMap(area => area.data),
       filter(data => data.facultyUserId !== facultyUserId)
     );
  }

  getAllAreas(){
    return this.http.get<IAreaRoot>(this.baseURL+'areas');
  }
}
