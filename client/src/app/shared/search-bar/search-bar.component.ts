import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/_services/file.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  key: string;
  
  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  onKeyInput(key: string){
    if(key.trim() !== ''){
      this.fileService.onSearch.next(key);
    }else{
      this.fileService.updateNeeded.next();
    }
  }
}
