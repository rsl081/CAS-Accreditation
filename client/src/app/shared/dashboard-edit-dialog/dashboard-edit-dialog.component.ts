import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { OverlayService } from 'src/app/_services/overlay.service';
import { IUser } from '../models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AreaService } from 'src/app/_services/area.service';
import { ParameterService } from 'src/app/_services/parameter.service';
import { LevelService } from 'src/app/_services/level.service';
import { IArea } from '../models/area';
import { KeywordService } from 'src/app/_services/keyword.service';

@Component({
  selector: 'app-dashboard-edit-dialog',
  templateUrl: './dashboard-edit-dialog.component.html',
  styleUrls: ['./dashboard-edit-dialog.component.css']
})
export class DashboardEditDialogComponent implements OnInit {

  @Input() currentId!: string;
  @Input() type!: string;
  @Input() dialogTitle!: string;
  @Input() currentLabel!: string;
  @Output() dialogClosed = new EventEmitter<void>();
  user: IUser;
  baseURL = environment.apiUrl;
  editForm: FormGroup;
  
  constructor(
    private accountService: AccountService,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private levelService: LevelService,
    private keywordService: KeywordService,
    private areaService: AreaService,
    private parameterService: ParameterService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    // notify home component that the overlay is active 
    this.overlayService.showOverlay.emit();
    this.accountService.currentUser$.subscribe({
      next: user => this.user = user
    });
    this.createEditForm();
  }

  createEditForm(){
    this.editForm = this.formBuilder.group({
      areaNameNo: [null, [ Validators.required ]],
      newName: [null,[ Validators.required ]],
    });
  }

  isFormValid(): boolean{
    if (this.type === 'area'){
      let areaNameNo = this.editForm.controls['areaNameNo'];
      let areaName = this.editForm.controls['newName'];
      if(areaNameNo.status === 'INVALID' || areaName.status === 'INVALID'){
        return false;
      }
      return true;
    } else {
      if (this.editForm.controls['newName'].status === 'INVALID'){
        return false;
      } 
      return true;
    }
  }

  onSubmit(){
    if(this.isFormValid()){
      this.updateRequest();
      this.closeDialog();
    }
  }

  updateRequest(){
    let url: string;
    let body: {};

    switch(this.type){
      case 'level':
        body = {
          levelName: this.editForm.controls['newName'].value,
          Name: this.user.displayName
        };
        this.levelService.updateLevel(this.currentId, body).subscribe({
          next: () =>{
            this.levelService.updateNeeded.next();
          }
        });
        break;
      case 'keyword':
        this.route.queryParams.subscribe((keyword: Params) =>{
            body = {
              keywordName: this.editForm.controls['newName'].value,
              name: this.user.displayName,
              levelId: keyword['levelId'],
            };
            this.keywordService.updateKeyword(this.currentId, body).subscribe({
              next: () =>{
                this.keywordService.updateNeeded.next();
              }
            })
          });
        break;
      case 'area':
        console.log('area');
        this.route.queryParams.subscribe((params: Params) =>{
          body = {
            arNameNo: this.editForm.controls['areaNameNo'].value,
            arName: this.editForm.controls['newName'].value,
            name: this.user.displayName,
            levelId: params['levelId'],
         }
          this.areaService.updateArea(this.currentId, body).subscribe({
            next: (response: IArea) =>{
              if(this.user.role === 'Faculty'){
                this.areaService.lastEditUpdateNeeded.next(response)
              }else{
                 this.areaService.updateNeeded.next();
              }
            }
          });
        });
        break;

      case 'parameter':
        this.route.queryParams.subscribe((params: Params) =>{
            body = {
              paramName: this.editForm.controls['newName'].value,
              name: this.user.displayName,
              areaId: params['areaId'],
            };
            this.parameterService.updateParameter(this.currentId, body).subscribe({
              next: () =>{
                this.parameterService.updateNeeded.next();
              }
            })
          });
        break;
      default:
        alert('There was a problem processing your request');
    }
  }

  updateErrorCallback(error: any){
    console.log(error);
  }

  closeDialog(){
    this.dialogClosed.emit();
    // notify home component that the overlay is inactive
    this.overlayService.hideOverlay.emit();
  }

}
