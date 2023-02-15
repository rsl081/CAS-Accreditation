import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { from, map } from 'rxjs';
import { IFaculty } from 'src/app/shared/models/faculty';
import { IFile } from 'src/app/shared/models/file';
import { ExcelService } from 'src/app/_services/excel.service';
import { FacultyService } from 'src/app/_services/faculty.service';
import { FileService } from 'src/app/_services/file.service';
import { OverlayService } from 'src/app/_services/overlay.service';

@Component({
  selector: 'app-admin-summary-gen',
  templateUrl: './admin-summary-gen.component.html',
  styleUrls: ['./admin-summary-gen.component.css'],
})
export class AdminSummaryGenComponent implements OnInit {

  files: IFile[] = [];
  showEditFileDialog: boolean = false;
  fileToEdit: IFile;
  showMoveFileDialog: boolean = false;
  fileToMove: IFile;
  faculty: IFaculty[] = [];
  totalFaculties: number = 0;
  totalFiles: number = 0;
  areFilesLoaded: boolean;
  isSearching: boolean;

  // for excel
  data: any[] = [];
  columns: any[][];
  footerData: any[][] = [];

  constructor(
    private fileService: FileService,
    private toaster: ToastrService,
    private overlayService: OverlayService,
    private facultyService: FacultyService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.fetchAllFiles();
    this.registerCustomEvents();
  }

  registerCustomEvents(){
    this.fileService.updateNeeded.subscribe(() =>{
      this.fetchAllFiles();
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
      this.fileService.searchFileGeneral(key).subscribe({
        next: (response) => {
          this.files = response.data;
          console.log(key);
          if (key.length === 1) {
            this.isSearching = false;
          }else{
            this.isSearching = true;
          }
        },
        complete: () => {;
          
        },
      });
    });

    this.fileService.onSortName.subscribe({
      next: method => {
        this.fileService.sortName(method).subscribe({
          next: sortedFiles => this.files = sortedFiles.data
        });
      }
    });

     this.fileService.onSortFileName.subscribe({
      next: method => {
        this.fileService.sortFileName(method).subscribe({
          next: sortedFiles => this.files = sortedFiles.data
        });
      }
    });

    this.facultyService.getAllFaculties().subscribe({
      next: response => this.faculty = response.data
    });
    
    this.facultyService.getTotalFaculties().subscribe({
      next: response => this.totalFaculties = response
    });

    this.fileService.getTotalFiles().subscribe({
      next: response => this.totalFiles = response
    });
  }

  initExcelProperties(){
    this.columns = [
      ['Name', 'File Name', 'Link to the File', 'Size', 'Date Created', 'Last Modified'],
      ['Name', 'Email', 'Acount Creation Date', 'Level(s)', 'Area(s)'],
    ];
    this.data = [];
    this.footerData = [
      [['','','','','Total',this.totalFiles]], 
      [['','','','Total',this.totalFaculties]]
    ];
  }

  fetchAllFiles(){
    this.fileService.getAllFilesGeneral().subscribe({
      next: (files) => (this.files = files),
      error: (error) => this.toaster.error(error.message),
      complete: () => (this.areFilesLoaded = true),
    });
  }

  toggleEditFileDialog(){
    this.showEditFileDialog = !this.showEditFileDialog;
  }

  toggleMoveFileDialog(){
    this.showMoveFileDialog = !this.showMoveFileDialog;
  }

  exportExcel(type: string){
    this.initExcelProperties();
    if(type === 'File'){
      from(this.files).pipe(
        map((file: IFile) => file)
      ).subscribe({
        next: file =>{
          let data = this.setFileData(file);
          this.data.push(data);
        },
        complete: () =>{
          this.excelService.exportAsExcelFile(
            'File',
            'Summary of Files', 
            'Web-Based File Repositories for Accreditation System', 
            this.columns[0], 
            this.data, 
            this.footerData[0], 
            'files-summary-report', 
            'Sheet1'
          );
        }
      });
    }else if(type === 'Faculty'){
      from(this.faculty).pipe(
        map((faculty: IFaculty) => faculty)
      ).subscribe({
        next: faculty =>{
          let data = this.setFacultyData(faculty);
          this.data.push(data);
        },
        complete: () =>{
          this.excelService.exportAsExcelFile(
            'Faculty',
            'Summary of Faculty', 
            'Web-Based File Repositories for Accreditation System', 
            this.columns[1], 
            this.data, 
            this.footerData[1], 
            'faculty-summary-report', 
            'Sheet1'
          );
        }
      });
    } 
  }

  setFileData(file: IFile): any{
    return {
      Name: file.name,
      FileName: file.fileName,
      LinkToTheFile: file.fileRepo,
      Size: file.size,
      DateCreated: file.createdAt,
      LastModified: file.lastModifiedAt
    }
  }

  setFacultyData(faculty: IFaculty){
    let levels = '';
    let areas = '';

    this.facultyService.getFacultyLevel(faculty.areas)
    .subscribe({
      next: response => {
        if (levels.length === 0){
          levels += response;
        } else if(levels.length > 0){
          let flag = levels.includes(response);
          if(!flag){
            levels += response;
          }
        }
      }
    });
    this.facultyService.getFacultyArea(faculty.areas)
      .subscribe({
        next: response => areas += response
    });
    return {
      Name: faculty.displayName,
      Email: faculty.email,
      AccountCreationDate: faculty.createdAt,
      Levels: levels,
      Areas: areas,
    }
  }

}
