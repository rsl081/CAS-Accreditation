import { Component, Input, OnInit } from '@angular/core';
import { IDashboardCard } from 'src/app/shared/models/dashboard-card';
import { IParameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-accre-parameter',
  templateUrl: './accre-parameter.component.html',
  styleUrls: ['./accre-parameter.component.css']
})
export class AccreParameterComponent implements OnInit {

  @Input('element') parameter!: IParameter;
  
  constructor() { }

  ngOnInit(): void {
  }

  populateCardDetails(): IDashboardCard{
    return {
      id: this.parameter.id, 
      type: 'parameter', 
      cardLabel: this.parameter.paramName, 
      name: this.parameter.name,
      lastModifiedAt: this.parameter.lastModifiedAt,
      btnLabel: 'View Files'
    };
  }

}
