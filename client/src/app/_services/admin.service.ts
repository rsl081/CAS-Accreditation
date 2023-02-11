import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdminRoot } from '../shared/models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseURL = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getTotalAdmins(){
    return this.http.get<IAdminRoot>(this.baseURL+'account/admin/all').pipe(
      map(admin => admin.count)
    );
  }
}
