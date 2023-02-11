import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from './shared/models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  title = 'web-based-file-repositories';
  user: IUser;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {

    this.setCurrentUser();
    this.accountService.currentUser$.subscribe({
      next: user => this.user = user,
      error: () => {
        console.log('error');
      }
    });

  }

  setCurrentUser() {
    let user: IUser = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}
