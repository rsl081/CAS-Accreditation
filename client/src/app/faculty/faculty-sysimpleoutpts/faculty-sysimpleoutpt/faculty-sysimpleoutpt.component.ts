import { Component, Input, OnInit } from '@angular/core';
import { IDashboardCard } from 'src/app/shared/models/dashboard-card';
import { ISysImpleOutpt } from 'src/app/shared/models/sysimpleoutpt';

@Component({
  selector: 'app-faculty-sysimpleoutpt',
  templateUrl: './faculty-sysimpleoutpt.component.html',
  styleUrls: ['./faculty-sysimpleoutpt.component.css'],
})
export class FacultySysimpleoutptComponent implements OnInit {
  
  @Input('element') system!: ISysImpleOutpt;

  constructor() {}

  ngOnInit(): void {}

  populateCardDetails(): IDashboardCard {
    return {
      id: this.system.id,
      type: 'system',
      cardLabel: this.system.systemName,
      name: this.system.name,
      lastModifiedAt: this.system.lastModifiedAt,
      btnLabel: 'View',
    };
  }
  
}
