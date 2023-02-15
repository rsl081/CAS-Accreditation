import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { IFile } from '../models/file';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css'],
})
export class AdminTableComponent implements OnInit {

  @Input() files: IFile[];
  role: string;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: (user) => (this.role = user.role),
    });
  }
  
}
