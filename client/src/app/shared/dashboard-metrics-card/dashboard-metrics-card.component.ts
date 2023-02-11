import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-metrics-card',
  templateUrl: './dashboard-metrics-card.component.html',
  styleUrls: ['./dashboard-metrics-card.component.css']
})
export class DashboardMetricsCardComponent implements OnInit {

  @Input() type: string;
  @Input() cardLabel: string;
  @Input() figures: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
