import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/_services/navigation.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {}
  
  isDarkMode(): boolean {
    return this.navigationService.getDarkMode();
  }
}
