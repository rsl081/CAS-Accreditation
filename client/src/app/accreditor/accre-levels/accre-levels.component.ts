import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILevel, ILevelRoot } from 'src/app/shared/models/level';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accre-levels',
  templateUrl: './accre-levels.component.html',
  styleUrls: ['./accre-levels.component.css']
})
export class AccreLevelsComponent implements OnInit {

  baseUrl = environment.apiUrl;
  levels: ILevel[] = [];
  showDialog = false;
  
  constructor(
    private http: HttpClient, 
  ) { }

  ngOnInit(): void {
    this.fetchLevels();
  }

  fetchLevels(): void {
    this.http.get<ILevelRoot>(this.baseUrl+'levels')
    .subscribe({
      next: (response) => { this.levels = response.data; console.log(response) },
      error: (error) => { alert(error.message) }
    });
  }

}
