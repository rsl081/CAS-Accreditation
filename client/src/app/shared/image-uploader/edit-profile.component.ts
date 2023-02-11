import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  
  uploader: FileUploader;
  baseURL = environment.apiUrl;
  user: IUser;
  localImageUrl: any;
  nameForm: FormGroup;
  
  constructor(
    private accountService: AccountService,
    private toaster: ToastrService,
    public sanitizer: DomSanitizer,
    private formBuilder: FormBuilder
    ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    });
  }

  ngOnInit(): void {
    this.initializeUploader();
    this.createNameForm();
    this.localImageUrl = this.user.photoUrl;
  }

  createNameForm(){
    this.nameForm = this.formBuilder.group(
      {
        name: [ null, [Validators.required, Validators.pattern('^([A-Za-z0-9]\\s?)+([,]\\s?([A-Za-z0-9]\\s?)+)*$')],
      ],
      }
    )
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      authToken: 'Bearer '+this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false
    });

    this.uploader.onAfterAddingFile = (file: FileItem) =>{
      file.withCredentials = false;
      let url = (window.URL) ? window.URL.createObjectURL(file._file) : (window as any).webkitURL.createObjectURL(file._file);
      this.localImageUrl = url;
    }

    this.uploader.onSuccessItem = (item, response) =>{
      console.log(response)
      if (item.isSuccess){
        this.toaster.success('Profile photo uploaded successfully!');
        // temporary solution
        let res = JSON.parse(response);
        this.accountService.userUpdateNeeded.next({url: res.url});
      }
    }

    this.uploader.onErrorItem = (item) =>{
      if(!item.isSuccess){
        this.toaster.error('Upload failed');
      }
    }
  }

  isFormValid(): boolean{
    if(this.nameForm.controls['name'].status === 'VALID' || this.uploader.queue.length){
      return true;
    }
    return false;
  }

  uploadProfilePhoto(){
    if(this.uploader.queue.length){
      this.uploader.setOptions({
        url: this.baseURL+'account/add-photo'
      });
      this.uploader.uploadAll();
    }
  }

  onUpload(){
    if(this.isFormValid()){
      if(this.nameForm.controls['name'].status === 'VALID'){
        let body = {
          displayName: this.nameForm.controls['name'].value
        }
        this.accountService.editProfileName(body).subscribe({
          next: () =>{
            this.toaster.success('Name was updated successfully!');
            this.accountService.userUpdateNeeded.next({displayName: body.displayName});
            this.uploadProfilePhoto();
          }
        });
      } else{
      this.uploadProfilePhoto();
      }
    }
  }
}
