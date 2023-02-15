import { Component, Input, OnInit } from '@angular/core';
import { IDashboardCard } from 'src/app/shared/models/dashboard-card';
import { IScheme } from 'src/app/shared/models/scheme';

@Component({
  selector: 'app-accre-scheme',
  templateUrl: './accre-scheme.component.html',
  styleUrls: ['./accre-scheme.component.css'],
})
export class AccreSchemeComponent implements OnInit {

  @Input('element') scheme!: IScheme;

  constructor() {}

  ngOnInit(): void {}

  populateCardDetails(): IDashboardCard {
    return {
      id: this.scheme.id,
      type: 'scheme',
      cardLabel: this.scheme.schemeName,
      name: this.scheme.name,
      lastModifiedAt: this.scheme.lastModifiedAt,
      btnLabel: 'View File',
    };
  }
  
}
