import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { FileService } from 'src/app/_services/file.service';
import { IFile } from '../models/file';
import { IUser } from '../models/user';

@Component({
  selector: '[app-file-table-row]',
  templateUrl: './file-table-row.component.html',
  styleUrls: ['./file-table-row.component.css']
})
export class FileTableRowComponent implements OnInit {

  @Input() file: IFile;
  @Input() role: string;
  user: IUser;
  currentAreaControl: string;
  
  constructor(
    private accountService: AccountService,
    private toaster: ToastrService,
    private fileService: FileService,
  ) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: user => {
        this.user = user;
          if(this.user.role === 'Faculty'){
          if(localStorage.getItem('currentAreaControl')){
            this.currentAreaControl = JSON.parse(localStorage.getItem('currentAreaControl'));
            console.log(this.currentAreaControl)
          }
        }
      }
    });
  }

  onDownload(){
    if(this.file.fileRepo){
      window.open(this.file.fileRepo, '_blank');
    }else{
      this.toaster.error('File not found');
    }
  }

  onEdit(){
    this.fileService.editFileShow.next(this.file);
  }

  onMove(){
    this.fileService.moveFileShow.next(this.file);
  }

  onRemove(){
    this.fileService.removeFile(this.file.id).subscribe({
      error: error => this.toaster.error(error.message),
      complete: () =>{
        this.toaster.success('File deleted successfully');
        this.fileService.updateNeeded.next();
      }
    });
  }

}
