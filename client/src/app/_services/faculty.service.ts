import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFacultyRoot } from '../shared/models/faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  baseURL = environment.apiUrl;
  currentAreaControl: string;
  
  constructor(private http: HttpClient) { }

  getTotalFaculties(){
    return this.http.get<IFacultyRoot>(this.baseURL+'account/faculty/all').pipe(
      map(faculty => faculty.count)
    );
  }

  getAllFaculties(){
    return this.http.get<IFacultyRoot>(this.baseURL+'account/faculty/all');
  }

  getFacultyLevel(areas: string[]){
    return from(areas).pipe(
      map((area: string) =>{
        return area;
      })
    );
  }

  getFacultyArea(areas: string[]){
     return from(areas).pipe(
      map((area: string) =>{
       return area
      })
    );
  }

  setCurrentAreaControl(control: string){
    localStorage.setItem('currentAreaControl', JSON.stringify(control));
  }

  unsetCurrentAreaControl(){
    localStorage.removeItem('currentAreaControl');
  }
}
