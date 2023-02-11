import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';
import { NavigationService } from 'src/app/_services/navigation.service';
import { OverlayService } from 'src/app/_services/overlay.service';
import { ViewportService } from 'src/app/_services/viewport.service';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  isNavOpened = false;
  user: IUser;

  constructor(
    private navigationService: NavigationService,
    private viewportService: ViewportService,
    private overlayService: OverlayService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
    this.accountService.currentUser$.subscribe({
      next: (user) => (this.user = user),
      error: (error) => console.log(error),
    });
    this.registerCustomEvents();
  }
  
  isDarkMode(): boolean {
    return this.navigationService.getDarkMode();
  }

  setCurrentUser() {
    let user: IUser = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  registerCustomEvents() {
    // notify this component once the sidebar is opened or closed
    this.navigationService.navOpened.subscribe(() => {
      this.isNavOpened = true;
      this.disableScrollbar();
    });

    this.navigationService.navClosed.subscribe(() => {
      this.isNavOpened = false;
      this.enableScrollbar();
    });

    // notify this component if the overlay is active or not
    this.overlayService.showOverlay.subscribe(() => {
      this.disableScrollbar();
    });

    this.overlayService.hideOverlay.subscribe(() => {
      this.enableScrollbar();
    });

    // temporary solution
    this.accountService.userUpdateNeeded.subscribe({
      next: (response: any) => {
        let user: IUser = JSON.parse(localStorage.getItem('user'));
        if (response.url) {
          user.photoUrl = response.url;
        }
        if (response.displayName) {
          user.displayName = response.displayName;
        }
        this.accountService.setCurrentUser(user);
      },
    });
  }

  // event listener for screen resize
  @HostListener('window:resize')
  onWindowResize() {
    if (this.isNavOpened) {
      // check the viewport everytime the user resize the screen
      if (this.viewportService.breakpoint === 'desktop') {
        // if the screen is large (desktop), set the isNavOped to false
        this.isNavOpened = false;
        // this will closed the overlay
      }
    }
  }

  disableScrollbar() {
    this.renderer.setStyle(
      this.elRef.nativeElement.closest('body'),
      'overflow',
      'hidden'
    );
  }

  enableScrollbar() {
    this.renderer.setStyle(
      this.elRef.nativeElement.closest('body'),
      'overflow',
      'unset'
    );
  }
}
