import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { ILevelRoot, ILevel } from 'src/app/shared/models/level';
import { environment } from 'src/environments/environment';
import { LevelService } from 'src/app/_services/level.service';

@Component({
  selector: 'app-admin-levels',
  templateUrl: './admin-levels.component.html',
  styleUrls: ['./admin-levels.component.css'],
})
export class AdminLevelsComponent implements OnInit {

  baseUrl = environment.apiUrl;
  levels: ILevel[] = [];
  showDialog = false;

  constructor(private levelService: LevelService) {}

  ngOnInit(): void {
    this.fetchLevels();
    this.levelService.updateNeeded.subscribe(() =>{
       this.fetchLevels();
    });
  }

  fetchLevels(): void {
    this.levelService.getAllLevels().subscribe({
      next: levels => this.levels = levels,
      error: (error) => alert(error.message) 
    });
  }

  toggleAddLevelDialog(): void {
    this.showDialog = !this.showDialog;
  }

}