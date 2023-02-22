import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { FileService } from 'src/app/_services/file.service';
import { IFile } from '../models/file';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css'],
})
export class AdminTableComponent implements OnInit {
  @Input() files: IFile[];
  role: string;

  @Input() file: IFile;

  constructor(
    private accountService: AccountService,
    private toaster: ToastrService,
    private fileService: FileService
  ) {}


  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: (user) => (this.role = user.role),
    });
    
    
  }

  

  onDownload() {
    if (this.file.fileRepo) {
      window.open(this.file.fileRepo, '_blank');
    } else {
      this.toaster.error('File not found');
    }
  }

  onEdit() {
    this.fileService.editFileShow.next(this.file);
  }

  onMove() {
    this.fileService.moveFileShow.next(this.file);
  }

  onRemove() {
    
    this.fileService.removeFile(this.file.id).subscribe({
      error: (error) => this.toaster.error(error.message),
      complete: () => {
        this.toaster.success('File deleted successfully');
        this.fileService.updateNeeded.next();
      },
    });
    
  }

}
