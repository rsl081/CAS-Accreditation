import { Component, Input, OnInit } from '@angular/core';
import { IDashboardCard } from 'src/app/shared/models/dashboard-card';
import { ILevel } from 'src/app/shared/models/level';

@Component({
  selector: 'app-faculty-level',
  templateUrl: './faculty-level.component.html',
  styleUrls: ['./faculty-level.component.css']
})
export class FacultyLevelComponent implements OnInit {

  @Input('element') level!: ILevel;
  
  constructor() { }

  ngOnInit(): void {
  }

  populateCardDetails(): IDashboardCard{
    return {
      id: this.level.id, 
      type: 'level', 
      name: this.level.name,
      lastModifiedAt: this.level.lastModifiedAt,
      cardLabel: this.level.levelName, 
      btnLabel: 'View Area'
    };
  }

}
