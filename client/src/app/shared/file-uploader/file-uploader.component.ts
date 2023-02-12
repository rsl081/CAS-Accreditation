import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { FileService } from 'src/app/_services/file.service';
import { environment } from 'src/environments/environment';
import { IFile } from '../models/file';
import { IUser } from '../models/user';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  @Input() isOnDialog: boolean;
  @Input() fileToEdit: IFile;
  query: string = '';
  uploader: FileUploader;
  hasBaseDropZoneOver:boolean = false;
  baseURL = environment.apiUrl;
  user: IUser;
  
  constructor(
    private accountService: AccountService,
    private toaster: ToastrService,
    private fileService: FileService,
    private route: ActivatedRoute
    ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    });
  }

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['paramId'];
    this.initializeUploader();
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      authToken: 'Bearer '+this.user.token,
      isHTML5: true,
      allowedFileType: ['pdf', 'image'],
      removeAfterUpload: true,
      autoUpload: false
    });

    this.uploader.onAfterAddingFile = (file: FileItem) =>{
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item) =>{
       if (item.isSuccess){
        if (this.isOnDialog){
          this.toaster.success('File updated successfully!');
          // notify parent to close the dialog
          this.fileService.editFileClosed.next();
        } else{
          this.toaster.success('File has been uploaded successfully!');
        }
        // update UI
        this.fileService.updateNeeded.next();
      }
    }

    this.uploader.onErrorItem = (item) =>{
      if(!item.isSuccess){
        this.toaster.error('Upload failed');
        if(this.isOnDialog){
        // notify parent to close the dialog
        this.fileService.editFileClosed.next();
      }
      }
    }
  }

  fileOverBase(ev: any){
    this.hasBaseDropZoneOver = ev;
  }

  createFile(body: {}){
    this.fileService.createFile(body).subscribe({
      next: file => {
        this.uploader.setOptions({
          url: this.baseURL+'files/add-file/'+file.id
        });
        this.uploader.uploadAll();
      }
    });
  }

  updateFile(id:string, body: {}){
    this.fileService.updateFile(id, body).subscribe({
      next: file =>{
        this.fileService.getFileRepoById(file.id).subscribe({
          next: (fileRepo: any) =>{
            if(fileRepo.count !== 0){
              this.fileService.deleteFileRepo(fileRepo.data[0].id).subscribe({
                next: () =>{
                  this.uploadFile(file.id);
                }
              });
            }else{
              this.uploadFile(file.id);
            }
          }
        });
      }
    });
  }

  uploadFile(fileId: string){
    this.uploader.setOptions({
      url: this.baseURL+'files/add-file/'+fileId
    });
    this.uploader.uploadAll(); 
  }

  onUpload(){
    let body = {
      name: this.user.displayName,
      fileName: this.uploader.queue[0]._file.name,
      size: ((this.uploader.queue[0]._file.size / 1024 / 1024).toFixed(3)).toString() + ' MB',
      parameterId: isNaN(Number.parseInt(this.query))? this.fileToEdit.parameterId : Number.parseInt(this.query)
    }

    if (this.isOnDialog){
      this.updateFile(this.fileToEdit.id, body);
    } else{
      this.createFile(body);
    }
    
  }

}
