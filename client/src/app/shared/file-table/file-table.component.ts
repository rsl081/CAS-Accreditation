import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { IFile } from '../models/file';

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.css']
})
export class FileTableComponent implements OnInit {

  @Input() files: IFile[];
  role: string;
  
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: user => this.role = user.role
    });
  }

}
