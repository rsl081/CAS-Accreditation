import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArea } from 'src/app/shared/models/area';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AreaService } from 'src/app/_services/area.service';

@Component({
  selector: 'app-faculty-areas',
  templateUrl: './faculty-areas.component.html',
  styleUrls: ['./faculty-areas.component.css'],
})
export class FacultyAreasComponent implements OnInit {
  
  user: IUser;
  myAreaIds: number[] = [];
  myAreas: IArea[] = [];
  otherAreas: IArea[] = [];
  query: string = '';
  showDialog = false;

  constructor(
    private accountService: AccountService,
    private areaService: AreaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['levelId'];

    this.accountService.currentUser$.subscribe({
      next: user => this.user = user
    });

    this.areaService.getAreasByFacultyId(this.query, this.user.id).subscribe({
      next: response => this.myAreas.push(response)
    });

    this.areaService.updateNeeded.subscribe({
      next: () =>{
        this.areaService.getAreasByFacultyId(this.query ,this.user.id).subscribe({
          next: response => this.myAreas.push(response)
        });
      }
    });

    this.areaService.lastInUpdateNeeded.subscribe((area) =>{
      this.myAreas.push(area);
    });

    this.areaService.lastEditUpdateNeeded.subscribe((edittedArea) =>{
      this.myAreas.map((area, index) => {
        if(area.id == edittedArea.id){
          this.myAreas.splice(index, 1, edittedArea);
        }
      });
    });

    this.fetchOtherAreas()
  }

  fetchOtherAreas(){
    this.areaService.getOtherAreas(this.query, this.user.id).subscribe({
      next: area => this.otherAreas.push(area)
    });
  }

   toggleAddAreaDialog(){
    this.showDialog = !this.showDialog;
  }
}
