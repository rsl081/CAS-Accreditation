import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from, map } from 'rxjs';
import { IFile } from 'src/app/shared/models/file';
import { ExcelService } from 'src/app/_services/excel.service';
import { FileService } from 'src/app/_services/file.service';

@Component({
  selector: 'app-accre-files',
  templateUrl: './accre-files.component.html',
  styleUrls: ['./accre-files.component.css'],
})
export class AccreFilesComponent implements OnInit {
  @Input() parameterName?: string;
  query: string = '';
  files: IFile[] = [];
  totalFiles: number;
  areFilesLoaded: boolean;

  // for excel
  data: any[] = [];
  columns: any[];
  footerData: any[][] = [];

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private toaster: ToastrService,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['schemeId'];
    this.fetchFilesBySchemeId();
    this.registerCustomEvents();
  }

  registerCustomEvents() {
    this.fileService.updateNeeded.subscribe(() => {
      this.fetchFilesBySchemeId();
    });

    this.fileService.onSearch.subscribe((key) => {
      this.fileService.searchFileBySchemeId(key, this.query).subscribe({
        next: (response) => (this.files = response.data),
      });
    });

    this.fileService.onSortName.subscribe({
      next: (method) => {
        this.fileService
          .sortNameOnSelectedScheme(method, this.query)
          .subscribe({
            next: (sortedFiles) => (this.files = sortedFiles.data),
          });
      },
    });

    this.fileService.onSortFileName.subscribe({
      next: (method) => {
        this.fileService
          .sortFileNameOnSelectedScheme(method, this.query)
          .subscribe({
            next: (sortedFiles) => (this.files = sortedFiles.data),
          });
      },
    });

    this.fileService.getTotalFilesBySchemeId(this.query).subscribe({
      next: (response) => (this.totalFiles = response),
    });
  }

  initExcelData() {
    this.columns = [
      'Name',
      'File Name',
      'Link to the File',
      'Size',
      'Date Created',
      'Last Modified',
    ];
    this.data = [];
    this.footerData = [['', '', '', '', 'Total', this.totalFiles]];
  }

  fetchFilesBySchemeId() {
    this.fileService.getFilesBySchemeId(this.query).subscribe({
      next: (response) => (this.files = response),
      error: (error) => this.toaster.error(error.message),
      complete: () => (this.areFilesLoaded = true),
    });
  }

  exportExcel() {
    this.initExcelData();
    from(this.files)
      .pipe(map((file: IFile) => file))
      .subscribe({
        next: (file) => {
          let data = {
            Name: file.name,
            FileName: file.fileName,
            LinkToTheFile: file.fileRepo,
            Size: file.size,
            DateCreated: file.createdAt,
            LastModified: file.lastModifiedAt,
          };
          this.data.push(data);
        },
        complete: () => {
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
        },
      });
  }
}
