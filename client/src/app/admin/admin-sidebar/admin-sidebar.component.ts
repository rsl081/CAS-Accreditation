import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { NavigationService } from 'src/app/_services/navigation.service';
import { ViewportService } from 'src/app/_services/viewport.service';
import { AccountService } from 'src/app/_services/account.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
  animations: [
    trigger('toggleNav', [
      state(
        'show',
        style({
          left: 0,
        })
      ),
      state(
        'hide',
        style({
          left: '-16rem',
        })
      ),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('300ms ease-in')),
    ]),
  ],
})
export class AdminSidebarComponent implements OnInit {
  @Input() pictureUrl: string;
  public user: IUser;

  constructor(
    private navigationService: NavigationService,
    private viewportService: ViewportService,
    private accountService: AccountService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
    this.accountService.currentUser$.subscribe({
      next: (user) => (this.user = user),
      error: (error) => console.log(error),
    });
  }

  setCurrentUser() {
    let user: IUser = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  get stateName() {
    // trigger the animation only if the screen size is within the mobile breakpoint
    if (this.viewportService.breakpoint === 'mobile') {
      return this.isNavOpen() ? 'show' : 'hide';
    } else {
      // do nothing
      return 'default';
    }
  }

  isNavOpen(): boolean {
    return this.navigationService.getNavState();
  }

  isDarkMode():boolean {
    return this.navigationService.getDarkMode();
  }

  toggleDarkMode() {
    this.navigationService.toggleDarkMode();
  }

  // event listener for screen resize
  @HostListener('window:resize')
  onWindowResize() {
    if (this.isNavOpen()) {
      // check the viewport everytime the user resize the screen
      if (this.viewportService.breakpoint === 'desktop') {
        // if the screen is large (desktop), toggle the sidebar
        this.navigationService.toggleNavState();
      }
    }
  }

  // this method will call once any of the sidebar links are clicked
  closeSidebar() {
    this.navigationService.toggleNavState();
    // this will notify the other components that the sidebar is closed
    this.navigationService.navClosed.emit();
  }

  logout() {
    this.router.navigate(['/']);
    this.accountService.logout();
  }
}
