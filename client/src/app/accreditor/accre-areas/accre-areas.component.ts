import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArea, IAreaRoot } from 'src/app/shared/models/area';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accre-areas',
  templateUrl: './accre-areas.component.html',
  styleUrls: ['./accre-areas.component.css']
})
export class AccreAreasComponent implements OnInit {

  baseURL = environment.apiUrl;
  query: string = '';
  areas: IArea[] = []
  
  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['keywordId'];
    this.fetchAreasByLevelId();
  }

    fetchAreasByLevelId(){
    this.http.get<IAreaRoot>(this.baseURL+'areas?keywordId='+this.query).subscribe({
      next: response =>{
        this.areas = response.data;
      },
      error: error =>{
        alert(error.message);
      }
    });
  }

}
