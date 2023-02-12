import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILevelRoot } from '../shared/models/level';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  baseURL = environment.apiUrl;
  updateNeeded = new Subject<void>(); 
  
  constructor(private http: HttpClient) { }

  addLevel(body: {}){
    return this.http.post(this.baseURL+"levels", body);
  }
  
  updateLevel(id: string, body: {}){
    return this.http.put(this.baseURL+"levels/"+id, body);
  }

  deleteLevel(id: string){
    return this.http.delete(this.baseURL+"levels/"+id);
  }

  getAllLevels(){
    return this.http.get<ILevelRoot>(this.baseURL+'levels').pipe(
      map(file => file.data)
    );
  }
}
