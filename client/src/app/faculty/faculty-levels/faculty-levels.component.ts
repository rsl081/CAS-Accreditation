import { Component, OnInit } from '@angular/core';
import { ILevel } from 'src/app/shared/models/level';
import { LevelService } from 'src/app/_services/level.service';

@Component({
  selector: 'app-faculty-levels',
  templateUrl: './faculty-levels.component.html',
  styleUrls: ['./faculty-levels.component.css']
})
export class FacultyLevelsComponent implements OnInit {

  levels: ILevel[] = [];
  
  constructor(
    private levelService: LevelService
  ) { }

  ngOnInit(): void {
    this.levelService.getAllLevels().subscribe({
      next: levels => this.levels = levels
    });
  }

}
