import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { concatMap, from, map } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { AreaService } from 'src/app/_services/area.service';
import { FileService } from 'src/app/_services/file.service';
import { KeywordService } from 'src/app/_services/keyword.service';
import { LevelService } from 'src/app/_services/level.service';
import { OverlayService } from 'src/app/_services/overlay.service';
import { ParameterService } from 'src/app/_services/parameter.service';
import { SchemeService } from 'src/app/_services/scheme.service';
import { SysimpleoutptService } from 'src/app/_services/sysimpleoutpt.service';
import { environment } from 'src/environments/environment';
import { IArea, IAreaRoot } from '../models/area';
import { IFile, IFileRoot } from '../models/file';
import { IKeyword, IKeywordRoot } from '../models/keyword';
import { ILevel } from '../models/level';
import { IParameter, IParameterRoot } from '../models/parameter';
import { IScheme, ISchemeRoot } from '../models/scheme';
import { ISysImpleOutpt, ISysImpleOutptRoot } from '../models/sysimpleoutpt';
import { IUser } from '../models/user';

@Component({
  selector: 'app-move-file-dialog',
  templateUrl: './move-file-dialog.component.html',
  styleUrls: ['./move-file-dialog.component.css'],
})
export class MoveFileDialogComponent implements OnInit {
  baseURL = environment.apiUrl;
  user: IUser;
  levels: ILevel[] = [];

  areas: IArea[] = [];
  myAreaIndex: string;

  parameters: IParameter[] = [];
  myParameterIndex: string;

  sysimpleoutpts: ISysImpleOutpt[] = [];
  mySysImpleOutptIndex: string;

  schemes: IScheme[] = [];
  mySchemesIndex: string;

  keyword: string = '';
  keywordRoots: IKeywordRoot;

  files: any = [];
  filesSend: any = [];

  toggleCheckbox: boolean;
  schemeIds = [];

  isParentLevelSelected: boolean = false;
  isParentKeywordSelected: boolean = false;
  isParentAreaSelected: boolean = false;
  isParentParameterSelected: boolean = false;
  isParentSysImpleOutptSelected: boolean = false;
  isParentSchemeSelected: boolean = false;

  isDestinationValid: boolean = false;
  currentlySelectedScheme: IScheme;
  @Input('file') FileToMove: IFile;
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private overlayService: OverlayService,
    private http: HttpClient,
    private levelService: LevelService,
    private parameterService: ParameterService,
    private schemeService: SchemeService,
    private sysimpleoutptService: SysimpleoutptService,
    private areaService: AreaService,
    private keywordService: KeywordService,
    private fileService: FileService,
    private toaster: ToastrService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // notify home component that the overlay is active
    this.query = this.route.snapshot.queryParams['schemeId'];

    this.overlayService.showOverlay.emit();
    this.accountService.currentUser$.subscribe({
      next: (user) => (this.user = user),
    });

    this.fetchFile();
  }

  fetchFile() {
    this.fileService
      .getFile(this.FileToMove.id, this.FileToMove.fileName)
      .subscribe({
        next: (files) => {
          this.files = files;

          this.files.keyword.map((keyword: IKeyword, index) => {
            this.keyword = keyword.keywordName;

            this.http
              .get<IAreaRoot>(this.baseURL + 'areas?keywordId=' + keyword.id)
              .subscribe({
                next: (response) => (this.areas = response.data),
                complete: () => {
                  this.isDestinationValid = false;
                  this.currentlySelectedScheme = null;
                  this.isParentKeywordSelected = true;
                },
              });
          });

          // console.log('myyyy' +  this.files.keyword.map((x) =>
          //               x.area.map((a) => a)));
        },
      });
  }

  // onSelectLevel(level: ILevel, levelIndex: string) {
  //   if (!this.keywords[levelIndex]) {
  //     this.http
  //       .get<IKeywordRoot>(this.baseURL + 'keywords?levelId=' + level.id)
  //       .subscribe({
  //         next: (response) => (this.keywords[levelIndex] = response.data),
  //         complete: () => {
  //           this.isDestinationValid = false;
  //           this.currentlySelectedScheme = null;
  //           this.isParentLevelSelected = true;
  //         },
  //       });
  //   }
  // }

  // onSelectKeyword(keyword: IKeyword, keywordIndex: string) {
  //   if (!this.areas[keywordIndex]) {
  //     this.http
  //       .get<IAreaRoot>(this.baseURL + 'areas?keywordId=' + keyword.id)
  //       .subscribe({
  //         next: (response) => (this.areas[keywordIndex] = response.data),
  //         complete: () => {
  //           this.isDestinationValid = false;
  //           this.currentlySelectedScheme = null;
  //           this.isParentKeywordSelected = true;
  //         },
  //       });
  //   }
  // }
  
  onSelectArea(area: IArea, areaIndex: string) {

    this.myAreaIndex = areaIndex;
    this.myParameterIndex = '-1';
    this.mySysImpleOutptIndex = '-1';
    this.mySchemesIndex = '-1';
   
    this.http
      .get<IParameterRoot>(this.baseURL + 'params?areaId=' + area.id)
      .subscribe({
        next: (response) => {
          this.parameters = response.data;
        },
        complete: () => {
          this.isDestinationValid = false;
          this.currentlySelectedScheme = null;
          this.isParentAreaSelected = true;
          
        },
      });
  }

  onSelectParameter(parameter: IParameter, parameterIndex: string) {
    this.myParameterIndex = parameterIndex;
    this.isParentSchemeSelected = !this.isParentSchemeSelected;

    this.http
      .get<ISysImpleOutptRoot>(this.baseURL + 'systems?paramId=' + parameter.id)
      .subscribe({
        next: (response) => (this.sysimpleoutpts = response.data),
        complete: () => {
          this.isDestinationValid = false;
          this.currentlySelectedScheme = null;
          this.isParentParameterSelected = true;
        },
      });
  }

  onSelectSysImpleOutpt(system: ISysImpleOutpt, systemIndex: string) {
    this.mySysImpleOutptIndex = systemIndex;
    this.isParentSchemeSelected = !this.isParentSchemeSelected;
    
    this.http
      .get<ISchemeRoot>(this.baseURL + 'schemes?sysImpOutptId=' + system.id)
      .subscribe({
        next: (response) => (this.schemes = response.data),
        complete: () => {
          this.isDestinationValid = false;
          this.currentlySelectedScheme = null;
          this.isParentSysImpleOutptSelected = true;
          
        },
      });

  }

  onChangeFilesId($event) {
    const isCheck = $event.target.checked;
    const schemeId = $event.target.value;
    if (isCheck) {
      this.schemeIds = [...this.schemeIds, schemeId];
    } else {
      const index = this.schemeIds.indexOf(schemeId);
      if (index > -1) {
        // only splice array when item is found
        this.schemeIds.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  }

  onMove() {
    let obs = from(this.schemeIds);

    //Using MAP
    obs
      .pipe(
        map((val) => {
          return val; //Returning Value
        })
      )
      .subscribe((scheId) => {
        let body = {
          fileName: this.FileToMove.fileName,
          Name: this.user.displayName,
          size: this.FileToMove.size,
          schemeId: scheId,
        };

        this.fileService.createFile(body).subscribe({
          next: () => {
            this.fileService.updateNeeded.next();
          },
          complete: () => {
            this.toaster.success('File was successfully tagged');
            this.closeDialog();
          },
        });
      });
  }

  closeDialog() {
    this.fileService.moveFileClosed.next();
  }
}
