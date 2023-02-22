import { Component, Input, OnInit } from '@angular/core';
import { IArea } from 'src/app/shared/models/area';
import { IDashboardCard } from 'src/app/shared/models/dashboard-card';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {

  @Input('element') area: IArea;
  
  constructor() { }

  ngOnInit(): void {
  }

  populateCardDetails(): IDashboardCard{
    return {
      id: this.area.id, 
      type: 'area', 
      cardLabel: this.area.arNameNo+": "+this.area.arName + " " + this.area.keyword, 
      name: this.area.name,
      lastModifiedAt: this.area.lastModifiedAt,
      btnLabel: 'View Parameter'
    };
  }

}
