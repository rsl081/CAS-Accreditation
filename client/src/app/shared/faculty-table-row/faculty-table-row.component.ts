import { Component, Input, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/_services/faculty.service';
import { IFaculty } from '../models/faculty';

@Component({
  selector: '[app-faculty-table-row]',
  templateUrl: './faculty-table-row.component.html',
  styleUrls: ['./faculty-table-row.component.css']
})
export class FacultyTableRowComponent implements OnInit {

  @Input() faculty: any;
  levels: any = [];
  areas: string[] = [];
  params: any[] = [];
  sysimpleoutpts: any[] = [];
  
  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.getLevel();
    this.getAreas();
  }

  getLevel(){
    this.facultyService.getFacultyLevel(this.faculty.areas)
    .subscribe({
      next: (response: any) => {
        if (this.levels.length === 0){
          this.levels.push(response);
          this.params.push(response.param);
          this.sysimpleoutpts.push(response.sysImpOutpt);
          // console.log(response.sysImpOutpt);
        } else if(this.levels.length > 0){
          let flag = this.levels.find(level => level === response);
          if(flag == undefined){
            this.levels.push(response)
          }
        } 
      }
    });
  }

  getAreas(){
    this.facultyService.getFacultyArea(this.faculty.areas)
    .subscribe({
      next: response => this.areas.push(response)
    });
  }

}
