import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { concatMap, from } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { FileService } from 'src/app/_services/file.service';
import { LevelService } from 'src/app/_services/level.service';
import { OverlayService } from 'src/app/_services/overlay.service';
import { ParameterService } from 'src/app/_services/parameter.service';
import { SchemeService } from 'src/app/_services/scheme.service';
import { environment } from 'src/environments/environment';
import { IArea, IAreaRoot } from '../models/area';
import { IFile } from '../models/file';
import { IKeyword, IKeywordRoot } from '../models/keyword';
import { ILevel } from '../models/level';
import { IParameter, IParameterRoot } from '../models/parameter';
import { IScheme } from '../models/scheme';
import { ISysImpleOutpt, ISysImpleOutptRoot } from '../models/sysimpleoutpt';
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
  keywords: IKeyword[][] = [];
  areas: IArea[][] = [];
  parameters: IParameter[][] = [];
  sysimpleoutpts: ISysImpleOutpt[][] = [];
  schemes: IScheme[][] = [];

  isParentLevelSelected: boolean = false;
  isParentKeywordSelected: boolean = false;
  isParentAreaSelected: boolean = false;
  isParentParameterSelected: boolean = false;
  isParentSysImpleOutptSelected: boolean = false;


  isDestinationValid: boolean = false;
  currentlySelectedScheme: IScheme;
  @Input('file') FileToMove: IFile;
  
  constructor(
    private overlayService: OverlayService,
    private http: HttpClient,
    private levelService: LevelService,
    private parameterService: ParameterService,
    private schemeService: SchemeService,
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

  fetchKeywordsPerLevel(){
    from(this.levels).pipe(
      concatMap(level => 
        this.http.get<IKeywordRoot>(this.baseURL + 'keywords?levelId=' + level.id))
    ).subscribe({
      next: (response) => {
        let currentKeywords = response.data;
        this.keywords.push(currentKeywords);
      },
      error: (error) => alert(error.message),
      complete: () =>{
        // fetch parameter
      }
    });
  }


  onSelectLevel(level: ILevel, levelIndex: string){
    if(!this.keywords[levelIndex]){
       this.http.get<IKeywordRoot>(this.baseURL + 'keywords?levelId=' + level.id).subscribe({
        next: response => this.keywords[levelIndex] = response.data,
        complete: () =>{
          
          this.isDestinationValid = false;
          this.currentlySelectedScheme = null;
          this.isParentLevelSelected = true;
        }
      });
    }
  }

  onSelectKeyword(keyword: IKeyword, keywordIndex: string){
    if(!this.areas[keywordIndex]){
       this.http.get<IAreaRoot>(this.baseURL + 'areas?keywordId=' + keyword.id).subscribe({
        next: response => this.areas[keywordIndex] = response.data,
        complete: () =>{
          console.log(this.areas)
          this.isDestinationValid = false;
          this.currentlySelectedScheme = null;
          this.isParentKeywordSelected = true;
        }
      });
    }
  }

  onSelectArea(area: IArea, areaIndex: string){
    
    if(!this.parameters[areaIndex]){
      this.http.get<IParameterRoot>(this.baseURL + 'params?areaId=' + area.id).subscribe({
        next: response => this.parameters[areaIndex] = response.data,
        complete: () =>{
          
          this.isDestinationValid = false;
          this.currentlySelectedScheme = null;
          this.isParentAreaSelected = true;
        }
      });
    }

  }

  onSelectParameter(parameter: IParameter, parameterIndex: string){
    if(!this.sysimpleoutpts[parameterIndex]){
      this.http.get<ISysImpleOutptRoot>(this.baseURL + 'systems?parameterId=' + parameter.id).subscribe({
        next: response => this.sysimpleoutpts[parameterIndex] = response.data,
        complete: () =>{
         
          this.isDestinationValid = false;
          this.currentlySelectedScheme = null;
          this.isParentParameterSelected = true;
          
        }
      });
    }
  }

  onSelectSysImpleOutpt(system: ISysImpleOutpt, systemIndex: string){
    if(!this.schemes[systemIndex]){
        this.schemeService.getSchemesBySysImpleOutptId(system.id.toString()).subscribe({
        next: response => {
          console.log(response)
          this.schemes[systemIndex] = response.data
          if(this.schemes[systemIndex].length === 0){
            this.toaster.error(system.name+': '+system.systemName+' does not have any scheme(s) yet');
          }
        },
        complete: () =>{
          this.isDestinationValid = false;
          this.currentlySelectedScheme = null;
          this.isParentSysImpleOutptSelected = true;
        }
      });
    }
  }

  onSelectScheme(scheme: IScheme){
    this.isDestinationValid = true;
    this.currentlySelectedScheme = scheme;
  }

  onMove(){
     let body = {
      fileName: this.FileToMove.fileName,
      Name: this.user.displayName,
      size: this.FileToMove.size,
      parameterId: this.currentlySelectedScheme.id
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
