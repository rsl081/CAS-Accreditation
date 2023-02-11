import { Component, Input, OnInit } from '@angular/core';
import { IDashboardCard } from 'src/app/shared/models/dashboard-card';
import { ILevel } from 'src/app/shared/models/level';

@Component({
  selector: 'app-accre-level',
  templateUrl: './accre-level.component.html',
  styleUrls: ['./accre-level.component.css']
})
export class AccreLevelComponent implements OnInit {

  @Input('element') level!: ILevel;
  
  constructor() { }

  ngOnInit(): void {
  }

  populateCardDetails(): IDashboardCard{
    return {
      id: this.level.id, 
      type: 'level', 
      cardLabel: this.level.levelName, 
      name: this.level.name,
      lastModifiedAt: this.level.lastModifiedAt,
      btnLabel: 'View Area'
    };
  }

}
