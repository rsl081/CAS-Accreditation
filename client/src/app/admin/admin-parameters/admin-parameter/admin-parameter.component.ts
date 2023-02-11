import { Component, Input, OnInit } from '@angular/core';
import { IDashboardCard } from 'src/app/shared/models/dashboard-card';
import { IParameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-admin-parameter',
  templateUrl: './admin-parameter.component.html',
  styleUrls: ['./admin-parameter.component.css']
})
export class AdminParameterComponent implements OnInit {

  @Input('element') parameter!: IParameter;
  
  constructor() { }

  ngOnInit(): void {
  }

  populateCardDetails(): IDashboardCard{
    return {
      id: this.parameter.id, 
      type: 'parameter', 
      cardLabel: this.parameter.letterName, 
      name: this.parameter.name,
      lastModifiedAt: this.parameter.lastModifiedAt,
      btnLabel: 'View Files'
    };
  }

}
