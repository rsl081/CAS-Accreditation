import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAccreditorRoot } from '../shared/models/accreditor';

@Injectable({
  providedIn: 'root'
})
export class AccreditorService {

  baseURL = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getTotalAccreditors(){
    return this.http.get<IAccreditorRoot>(this.baseURL+'account/accreditor/all').pipe(
      map(accre => accre.count)
    );
  }
}
