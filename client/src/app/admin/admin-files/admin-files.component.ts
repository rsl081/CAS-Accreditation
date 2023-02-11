import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from, map } from 'rxjs';
import { IFile } from 'src/app/shared/models/file';
import { ExcelService } from 'src/app/_services/excel.service';
import { FileService } from 'src/app/_services/file.service';
import { OverlayService } from 'src/app/_services/overlay.service';

@Component({
  selector: 'app-admin-files',
  templateUrl: './admin-files.component.html',
  styleUrls: ['./admin-files.component.css']
})
export class AdminFilesComponent implements OnInit {

  query: string = '';
  files: IFile[] = [];
  showEditFileDialog: boolean = false;
  fileToEdit: IFile;
  showMoveFileDialog: boolean = false;
  fileToMove: IFile;
  totalFiles: number;
  areFilesLoaded: boolean;

  // for excel
  data: any[] = [];
  columns: any[];
  footerData: any[][];
  
  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private toaster: ToastrService,
    private overlayService: OverlayService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
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
      this.overlayService.hideOverlay.emit();
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

    this.fileService.getTotalFilesByParamId(this.query).subscribe({
      next: response => this.totalFiles = response
    });
  }

  initExcelData(){
    this.columns = ['Name', 'File Name', 'Link to the File', 'Size', 'Date Created', 'Last Modified', 'Status'];
    this.data = [];
    this.footerData = [['','','','','Total',this.totalFiles]];
  }

  fetchFilesByParameterId(){
    this.fileService.getFilesByParamId(this.query).subscribe({
      next: response => this.files = response,
      error: error => this.toaster.error(error.message),
      complete: () => this.areFilesLoaded = true
    })
  }

  toggleEditFileDialog(){
    this.showEditFileDialog = !this.showEditFileDialog;
  }

  toggleMoveFileDialog(){
    this.showMoveFileDialog = !this.showMoveFileDialog;
  }

  exportExcel(){
    this.initExcelData();
    from(this.files).pipe(
      map((file: IFile) => file)
    ).subscribe({
      next: file =>{
         let data = {
          Name: file.name,
          FileName: file.fileName,
          LinkToTheFile: file.fileRepo,
          Size: file.size,
          DateCreated: file.createdAt,
          LastModified: file.lastModifiedAt
        }
        this.data.push(data);
      },
      complete: () =>{
        this.excelService.exportAsExcelFile(
          'File',
          'Summary of Files', 
          'Web-Based File Repositories for Accreditation System', 
          this.columns, 
          this.data, 
          this.footerData, 
          'files-summary-report', 
          'Sheet1'
        );
      }
    });
  }
}
