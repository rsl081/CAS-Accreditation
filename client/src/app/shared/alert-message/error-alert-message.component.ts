import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {

  showAlert = true;
  @Input() alertType : string;
  @Input() alertTitle : string;
  @Input() alertMessage: string;
  
  constructor() { }

  ngOnInit(): void {
  }

  onCloseAlert(){
    this.showAlert = !this.showAlert;
  }

}
