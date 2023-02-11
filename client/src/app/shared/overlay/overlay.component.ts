import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  @Input() zIndex?: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
