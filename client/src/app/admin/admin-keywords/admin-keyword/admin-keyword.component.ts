import { Component, Input, OnInit } from '@angular/core';
import { IDashboardCard } from 'src/app/shared/models/dashboard-card';
import { IKeyword } from 'src/app/shared/models/keyword';

@Component({
  selector: 'app-admin-keyword',
  templateUrl: './admin-keyword.component.html',
  styleUrls: ['./admin-keyword.component.css'],
})
export class AdminKeywordComponent implements OnInit {

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
