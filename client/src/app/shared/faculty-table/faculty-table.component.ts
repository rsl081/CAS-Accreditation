import { Component, Input, OnInit } from '@angular/core';
import { IFaculty } from '../models/faculty';

@Component({
  selector: 'app-faculty-table',
  templateUrl: './faculty-table.component.html',
  styleUrls: ['./faculty-table.component.css']
})
export class FacultyTableComponent implements OnInit {

  @Input() faculty: IFaculty[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
