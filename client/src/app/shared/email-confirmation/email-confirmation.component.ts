import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { IUser } from '../models/user';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css'],
})
export class EmailConfirmationComponent implements OnInit {
  
  status: string = 'Verifying...';
  user: IUser;
  urlParams: any = {};

  constructor(
    private accountService: AccountService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.urlParams.token = this.activeRoute.snapshot.queryParamMap.get('token');
    this.urlParams.userId = this.activeRoute.snapshot.queryParamMap.get('userId');
    
    this.accountService.verifyEmail(this.urlParams).subscribe({
      error: (error) => console.log(error),
    });

  }

  goToHomepage() {
  
    this.router.navigateByUrl('/');
    
  }

 
}
