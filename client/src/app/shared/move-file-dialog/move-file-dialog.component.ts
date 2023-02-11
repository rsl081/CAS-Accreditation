import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { concatMap, from } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { FileService } from 'src/app/_services/file.service';
import { LevelService } from 'src/app/_services/level.service';
import { OverlayService } from 'src/app/_services/overlay.service';
import { ParameterService } from 'src/app/_services/parameter.service';
import { environment } from 'src/environments/environment';
import { IArea, IAreaRoot } from '../models/area';
import { IFile } from '../models/file';
import { ILevel } from '../models/level';
import { IParameter } from '../models/parameter';
import { IUser } from '../models/user';

@Component({
  selector: 'app-move-file-dialog',
  templateUrl: './move-file-dialog.component.html',
  styleUrls: ['./move-file-dialog.component.css']
})
export class MoveFileDialogComponent implements OnInit {

  baseURL = environment.apiUrl;
  user: IUser;
  levels: ILevel[] = [];
  areas: IArea[][] = [];
  parameters: IParameter[][] = [];
  isParentLevelSelected: boolean = false;
  isParentAreaSelected: boolean = false;
  isDestinationValid: boolean = false;
  currentlySelectedParameter: IParameter;
  @Input('file') FileToMove: IFile;
  
  constructor(
    private overlayService: OverlayService,
    private http: HttpClient,
    private levelService: LevelService,
    private parameterService: ParameterService,
    private fileService: FileService,
    private toaster: ToastrService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    // notify home component that the overlay is active 
    this.overlayService.showOverlay.emit();
    this.accountService.currentUser$.subscribe({
      next: user => this.user = user
    });
    this.fetchLevels();
    console.log(this.FileToMove)
  }

  fetchLevels(){
    this.levelService.getAllLevels().subscribe({
      next: levels => this.levels = levels
    })
  }

  fetchAreasPerLevel(){
    from(this.levels).pipe(
      concatMap(level => 
        this.http.get<IAreaRoot>(this.baseURL + 'areas?levelId=' + level.id))
    ).subscribe({
      next: (response) => {
        let currentAreas = response.data;
        this.areas.push(currentAreas);
      },
      error: (error) => alert(error.message),
      complete: () =>{
        // fetch parameter
      }
    });
  }

  onSelectLevel(level: ILevel, levelIndex: number){
    if(!this.areas[levelIndex]){
       this.http.get<IAreaRoot>(this.baseURL + 'areas?levelId=' + level.id).subscribe({
        next: response => this.areas[levelIndex] = response.data,
        complete: () =>{
          console.log(this.areas)
          this.isDestinationValid = false;
          this.currentlySelectedParameter = null;
          this.isParentLevelSelected = true;
        }
      });
    }
  }

  onSelectArea(area: IArea, areaIndex: number){
    if(!this.parameters[areaIndex]){
        this.parameterService.getParametersByAreaId(area.id.toString()).subscribe({
        next: response => {
          console.log(response)
          this.parameters[areaIndex] = response.data
          if(this.parameters[areaIndex].length === 0){
            this.toaster.error(area.arNameNo+': '+area.arName+' does not have any parameter(s) yet');
          }
        },
        complete: () =>{
          this.isDestinationValid = false;
          this.currentlySelectedParameter = null;
          this.isParentAreaSelected = true;
        }
      });
    }
  }

  onSelectParameter(parameter: IParameter){
    this.isDestinationValid = true;
    this.currentlySelectedParameter = parameter;
  }

  onMove(){
     let body = {
      fileName: this.FileToMove.fileName,
      Name: this.user.displayName,
      size: this.FileToMove.size,
      parameterId: this.currentlySelectedParameter.id
    }
    this.fileService.updateFile(this.FileToMove.id, body).subscribe({
      next: () =>{
        this.fileService.updateNeeded.next();
      },
      complete: () =>{
        this.toaster.success('File was successfully moved')
        this.closeDialog();
      }
    });
  }

  closeDialog(){
    this.fileService.moveFileClosed.next();
  }

}
