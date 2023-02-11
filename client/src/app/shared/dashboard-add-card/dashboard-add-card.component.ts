import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-add-card',
  templateUrl: './dashboard-add-card.component.html',
  styleUrls: ['./dashboard-add-card.component.css']
})
export class DashboardAddCardComponent implements OnInit {

  @Output() cardClicked = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onCardClick(){
    this.cardClicked.emit();
  }

}
