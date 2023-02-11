import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IFile } from 'src/app/shared/models/file';
import { FileService } from 'src/app/_services/file.service';
import { OverlayService } from 'src/app/_services/overlay.service';

@Component({
  selector: 'app-faculty-files',
  templateUrl: './faculty-files.component.html',
  styleUrls: ['./faculty-files.component.css'],
})
export class FacultyFilesComponent implements OnInit {
  
  @Input() parameterName?: string;
  files: IFile[] = [];
  query: string = '';
  showEditFileDialog: boolean = false;
  fileToEdit: IFile;
  showMoveFileDialog: boolean = false;
  fileToMove: IFile;
  currentAreaControl: string;
  areFilesLoaded: boolean;
  
  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private toaster: ToastrService,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.currentAreaControl = JSON.parse(localStorage.getItem('currentAreaControl'));
    this.query = this.route.snapshot.queryParams['paramId'];
    this.fetchFilesByParameterId();
    this.registerCustomEvents();
  }

   registerCustomEvents(){
    this.fileService.updateNeeded.subscribe(() =>{
      this.fetchFilesByParameterId();
    });

    this.fileService.editFileShow.subscribe((file) =>{
      this.fileToEdit = file;
      this.toggleEditFileDialog();
    });

    this.fileService.editFileClosed.subscribe(() =>{
       this.toggleEditFileDialog();
    });

    this.fileService.moveFileShow.subscribe((file) =>{
      this.fileToMove = file;
      this.toggleMoveFileDialog();
    });

    this.fileService.moveFileClosed.subscribe(() =>{
      this.toggleMoveFileDialog();
      this.overlayService.hideOverlay.emit();
    });

    this.fileService.onSearch.subscribe((key) =>{
      this.fileService.searchFileByParameterId(key, this.query).subscribe({
        next: response => this.files = response.data
      });
    });

    this.fileService.onSortName.subscribe({
      next: method => {
        this.fileService.sortNameOnSelectedParameter(method, this.query).subscribe({
          next: sortedFiles => this.files = sortedFiles.data
        });
      }
    });

     this.fileService.onSortFileName.subscribe({
      next: method => {
        this.fileService.sortFileNameOnSelectedParameter(method, this.query).subscribe({
          next: sortedFiles => this.files = sortedFiles.data
        });
      }
    });
  }

  fetchFilesByParameterId(){
    this.fileService.getFilesByParamId(this.query).subscribe({
      next: response => this.files = response,
      error: error => this.toaster.error(error.message),
      complete: () => this.areFilesLoaded = true
    });
  }

  toggleEditFileDialog(){
    this.showEditFileDialog = !this.showEditFileDialog;
  }

  toggleMoveFileDialog(){
    this.showMoveFileDialog = !this.showMoveFileDialog;
  }
}
