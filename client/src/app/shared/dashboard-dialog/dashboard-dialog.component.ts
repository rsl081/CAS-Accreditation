import { Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { OverlayService } from 'src/app/_services/overlay.service';
import { IUser } from '../models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from 'src/app/_services/area.service';
import { LevelService } from 'src/app/_services/level.service';
import { ParameterService } from 'src/app/_services/parameter.service';
import { IArea } from '../models/area';

@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: './dashboard-dialog.component.html',
  styleUrls: ['./dashboard-dialog.component.css']
})
export class DashboardDialogComponent implements OnInit{

  @Input() selectedParentId?: string;
  @Input() type: string;
  @Input() dialogTitle?: string;
  @Input() inputPlaceholder?: string;
  @Output() dialogClosed = new EventEmitter<void>();
  user: IUser;
  baseURL = environment.apiUrl;
  query: string = '';
  addDirectoryForm: FormGroup;
  
  constructor(
    private accountService: AccountService,
    private overlayService: OverlayService, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private levelService: LevelService,
    private areaService: AreaService,
    private parameterService: ParameterService
  ) { }

  ngOnInit(): void {
    // notify home component that the overlay is active 
    this.overlayService.showOverlay.emit();
    this.accountService.currentUser$.subscribe({
      next: user => this.user = user
    });
    this.query = this.route.snapshot.queryParams['levelId'];
    this.createAddDirectoryForm();
  }

  createAddDirectoryForm(){
    this.addDirectoryForm = this.formBuilder.group({
      areaNameNo: [null, [ Validators.required ]],
      prefName: [null,[ Validators.required ]],
    });
  }

  isFormValid(): boolean{
    if (this.type === 'area'){
      let areaNameNo = this.addDirectoryForm.controls['areaNameNo'];
      let areaName = this.addDirectoryForm.controls['prefName'];
      if(areaNameNo.status === 'INVALID' || areaName.status === 'INVALID'){
        return false;
      }
      return true;
    } else {
      if (this.addDirectoryForm.controls['prefName'].status === 'INVALID'){
        return false;
      } 
      return true;
    }
  }

  onSubmit(){
    if(this.isFormValid()){
      this.postRequest();
      this.closeDialog();
    }
  }

  postRequest(){
    let body: {};

    switch(this.type){
      case 'level':
        body = { 
          levelName: this.addDirectoryForm.controls['prefName'].value,
          Name: this.user.displayName
        };
        this.levelService.addLevel(body).subscribe({
          next: () =>{
            this.levelService.updateNeeded.next();
          }
        });
        break;
      case 'area':
        body = { 
          arNameNo: this.addDirectoryForm.controls['areaNameNo'].value,
          arName: this.addDirectoryForm.controls['prefName'].value,
          name: this.user.displayName,
          LevelId: this.query,
        };

        if(this.user.role === 'Faculty'){
          body['facultyUserId'] = this.user.id
        }
        
        this.areaService.addArea(body).subscribe({
          next: (response: IArea) =>{
            if(this.user.role === 'Faculty'){
              this.areaService.lastInUpdateNeeded.next(response);
            }else{
              this.areaService.updateNeeded.next();
            }
          }
        });
        break

      case 'parameter':
        body = {
          paramName: this.addDirectoryForm.controls['prefName'].value,
          Name: this.user.displayName,
          areaId: this.selectedParentId,
        };
        this.parameterService.addParameter(body).subscribe({
          next: () =>{
            this.parameterService.updateNeeded.next();
          }
        });
        break; 
      default:
        alert('There was a problem processing your request');
    }
  }

  postErrorCallback(error: any){
    alert(error.message);
  }

  closeDialog(){
    this.dialogClosed.emit();
    // notify home component that the overlay is inactive
    this.overlayService.hideOverlay.emit();
  }
}
