import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAreaRoot, IArea } from 'src/app/shared/models/area';
import { AreaService } from 'src/app/_services/area.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-areas',
  templateUrl: './admin-areas.component.html',
  styleUrls: ['./admin-areas.component.css']
})
export class AdminAreasComponent implements OnInit {

  baseURL = environment.apiUrl;
  query: string = '';
  areas: IArea[] = [];
  showDialog = false;
  
  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private areaService: AreaService
  ) { }

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['keywordId'];

    this.fetchAreasByKeywordId();
    this.areaService.updateNeeded.subscribe({
      next: () =>{
        this.fetchAreasByKeywordId();
      }
    });
  }

  fetchAreasByKeywordId(){
    this.http.get<IAreaRoot>(this.baseURL+'areas?keywordId='+this.query).subscribe({
      next: response =>{
        this.areas = response.data;
        
      },
      error: error =>{
        alert(error.message);
      }
    });
  }

  toggleAddAreaDialog(){
    this.showDialog = !this.showDialog;
  }

}
