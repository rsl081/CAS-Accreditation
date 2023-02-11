import { Component, Input, OnInit } from '@angular/core';
import { AccreditorService } from 'src/app/_services/accreditor.service';
import { AdminService } from 'src/app/_services/admin.service';
import { FacultyService } from 'src/app/_services/faculty.service';
import { FileService } from 'src/app/_services/file.service';
import { NavigationService } from 'src/app/_services/navigation.service';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  totalFiles: number = 0;
  totalAccreditors: number = 0;
  totalFaculties: number = 0;
  totalAdmins: number = 0;

  constructor(
    private fileService: FileService,
    private accreditorService: AccreditorService,
    private facultyService: FacultyService,
    private adminService: AdminService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.getTotalFiles();
    this.getTotalAccreditors();
    this.getTotalFaculties();
    this.getTotalAdmins();
    this.fileService.updateNeeded.subscribe(() => {
      this.getTotalFiles();
    });
  }

  isDarkMode(): boolean {
    return this.navigationService.getDarkMode();
  }

  getTotalFiles(): void {
    this.fileService.getTotalFiles().subscribe({
      next: (response) => (this.totalFiles = response),
    });
  }

  getTotalAccreditors(): void {
    this.accreditorService.getTotalAccreditors().subscribe({
      next: (response) => (this.totalAccreditors = response),
    });
  }

  getTotalFaculties() {
    this.facultyService.getTotalFaculties().subscribe({
      next: (response) => (this.totalFaculties = response),
    });
  }

  getTotalAdmins() {
    this.adminService.getTotalAdmins().subscribe({
      next: (response) => (this.totalAdmins = response),
    });
  }
}
