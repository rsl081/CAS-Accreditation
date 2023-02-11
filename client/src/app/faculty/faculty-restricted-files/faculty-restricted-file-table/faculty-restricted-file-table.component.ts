import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-faculty-restricted-file-table',
  templateUrl: './faculty-restricted-file-table.component.html',
  styleUrls: ['./faculty-restricted-file-table.component.css']
})
export class FacultyRestrictedFileTableComponent implements OnInit {

  @Input() files!: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
