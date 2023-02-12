import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { FacultyService } from 'src/app/_services/faculty.service';
import { IDashboardCard } from '../models/dashboard-card';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class DashboardCardComponent implements OnInit {

  @ViewChild('cardRef', {static: true}) cardRef!: ElementRef;
  @Input() card: IDashboardCard;
  @Input() nextRoute?: string;
  role: string;

  // ActivatedRoute simply injects the currently active route
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private accountService: AccountService,
    private facultyService: FacultyService
  ) {}

  extras: NavigationExtras = {};
  
  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: user => this.role = user.role
    });
    this.setNavigationExtras();
  }

  // create different navigation extras based on the type of card
  setNavigationExtras(): void{
    if(this.card.type === 'level'){
       this.extras = {relativeTo: this.route, queryParams: {levelId: this.card.id}};
    }
    else if(this.card.type === 'keyword'){
      this.extras = {relativeTo: this.route, queryParams: {keywordId: this.card.id}};
    }
    else if(this.card.type === 'area'){
      this.extras = {relativeTo: this.route, queryParams: {areaId: this.card.id}};
    }
    else if(this.card.type === 'parameter'){
      this.extras = {relativeTo: this.route, queryParams: {paramId: this.card.id}};
    }
    else if(this.card.type === 'system'){
      this.extras = {relativeTo: this.route, queryParams: {systemId: this.card.id}};
    }
    else if(this.card.type === 'scheme'){
      this.extras = {relativeTo: this.route, queryParams: {schemeId: this.card.id}};
    }
  }

  getNavigationExtras(): NavigationExtras{
    return this.extras;
  }

  onClick(){
    if(this.card.type === 'area'){
      this.facultyService.setCurrentAreaControl(this.card.cred);
    }
    this.router.navigate([this.nextRoute], this.getNavigationExtras());
  }
}
