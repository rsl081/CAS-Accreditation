import { Component, Input, OnInit } from '@angular/core';
import { IArea } from 'src/app/shared/models/area';
import { IDashboardCard } from 'src/app/shared/models/dashboard-card';

@Component({
  selector: 'app-faculty-area',
  templateUrl: './faculty-area.component.html',
  styleUrls: ['./faculty-area.component.css']
})
export class FacultyAreaComponent implements OnInit {

  @Input('element') area: IArea;
  @Input() cred: string;
  
  constructor() { }

  ngOnInit(): void {
  }

  populateCardDetails(): IDashboardCard{
     return {
      id: this.area.id, 
      type: 'area', 
      cred: this.cred,
      cardLabel: this.area.arNameNo+": "+this.area.arName, 
      name: this.area.name,
      lastModifiedAt: this.area.lastModifiedAt,
      btnLabel: 'View Parameters'
    };
  }

}
