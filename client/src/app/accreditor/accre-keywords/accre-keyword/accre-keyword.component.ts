import { Component, Input, OnInit } from '@angular/core';
import { IDashboardCard } from 'src/app/shared/models/dashboard-card';
import { IKeyword } from 'src/app/shared/models/keyword';

@Component({
  selector: 'app-accre-keyword',
  templateUrl: './accre-keyword.component.html',
  styleUrls: ['./accre-keyword.component.css'],
})
export class AccreKeywordComponent implements OnInit {
  
  @Input('element') keyword!: IKeyword;

  constructor() {}

  ngOnInit(): void {}

  populateCardDetails(): IDashboardCard {
    return {
      id: this.keyword.id,
      type: 'keyword',
      name: this.keyword.name,
      lastModifiedAt: this.keyword.lastModifiedAt,
      cardLabel: this.keyword.keywordName,
      btnLabel: 'View Area',
    };
  }
}
