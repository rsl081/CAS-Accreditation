import { Component, Input, OnInit } from '@angular/core';
import { IDashboardCard } from 'src/app/shared/models/dashboard-card';
import { IParameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-faculty-parameter',
  templateUrl: './faculty-parameter.component.html',
  styleUrls: ['./faculty-parameter.component.css']
})
export class FacultyParameterComponent implements OnInit {

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
