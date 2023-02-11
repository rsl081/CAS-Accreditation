import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/_services/file.service';

@Component({
  selector: 'app-file-sort-button-group',
  templateUrl: './file-sort-button-group.component.html',
  styleUrls: ['./file-sort-button-group.component.css']
})
export class FileSortButtonGroupComponent implements OnInit {

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  sortNameAscending(){
    this.fileService.onSortName.next('Ascending');
  }

  sortNameDescending(){
    this.fileService.onSortName.next('Descending');
  }

  sortfileNameAscending(){
    this.fileService.onSortFileName.next('Ascending')
  }

  sortfileNameDescending(){
    this.fileService.onSortFileName.next('Descending')
  }

}
