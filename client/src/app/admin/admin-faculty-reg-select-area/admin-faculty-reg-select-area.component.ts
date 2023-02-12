import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, from } from 'rxjs';
import { IArea, IAreaRoot } from 'src/app/shared/models/area';
import { ILevelRoot, ILevel } from 'src/app/shared/models/level';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-reg-select-area',
  templateUrl: './admin-faculty-reg-select-area.component.html',
  styleUrls: ['./admin-faculty-reg-select-area.component.css'],
})
export class AdminFacultyRegSelectAreaComponent implements OnInit {
  baseURL = environment.apiUrl;
  levels: ILevel[] = [];
  twoDimensionalAreas: IArea[][] = [];
  selectedAreas: IArea[] = [];
  isSelectionValid = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchLevels();
  }

  fetchLevels(): void {
    let url = this.baseURL + 'levels';
    this.http.get<ILevelRoot>(url).subscribe({
      next: (response) => (this.levels = response.data),
      error: (error) => alert(error.message),
      complete: () => {
        this.fetchAreasPerLevel();
      },
    });
  }

  fetchAreasPerLevel() {
    from(this.levels)
      .pipe(
        concatMap((level) =>
          this.http.get<IAreaRoot>(this.baseURL + 'areas?levelId=' + level.id)
        )
      )
      .subscribe({
        next: (response) => {
          let currentAreas = response.data;
          this.twoDimensionalAreas.push(currentAreas);
        },
        error: (error) => alert(error.message),
      });
  }

  errorCallback(error: any): void {
    alert(error.message);
  }

  addSelectedArea(area: IArea): void {
    this.selectedAreas.push(area);
  }

  popSelectedArea(area: IArea): void {
    this.selectedAreas.forEach((element, index) => {
      if (element.keywordId === area.keywordId && element.id === area.id) {
        this.selectedAreas.splice(index, 1);
        this.validateSelection();
      }
    });
  }

  validateSelection(): boolean {
    // validate if array is empty or not
    if (!Array.isArray(this.selectedAreas) || !this.selectedAreas.length) {
      return false;
    } else {
      return true;
    }
  }

  proceedToSummary() {
    this.isSelectionValid = this.validateSelection();
    if (this.isSelectionValid) {
      // get history state from the previous page
      let data: { [p: string]: any } = {
        accountDetails: {
          name: history.state.data.name,
          email: history.state.data.email,
          password: history.state.data.password,
          userType: history.state.data.userType,
        },
        areas: {},
      };
      this.selectedAreas.forEach((area, index) => {
        // Append each area to 'areas' object of data object dynamically - this will pass to the next route
        data['areas']['area ' + index] = {
          id: area.id,
          levelId: area.keywordId,
          title: area.arNameNo + ': ' + area.arName,
        };
      });
      this.router.navigate(['summary'], {
        relativeTo: this.route,
        state: { data },
      });
    }
  }

  back() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
