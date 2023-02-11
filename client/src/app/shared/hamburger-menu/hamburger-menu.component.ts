import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/_services/navigation.service';
import { ViewportService } from 'src/app/_services/viewport.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit {

  open = false;
  
  constructor(private navigationService: NavigationService, private viewportService: ViewportService) { 
    // notify hamburger menu once the sidebar is closed
    this.navigationService.navClosed.subscribe(()=>{
      this.open = false;
    })
  }

  ngOnInit(): void {
  }

  onToggle():void{
    this.navigationService.toggleNavState();
    this.open = !this.open;

    if(this.open == true){
      // if the hamburger menu is toggled on, invoke the navOpened event
      this.navigationService.navOpened.emit();
    }else{
      // if the hamburger menu is toggled off, invoke the navClosed event
      this.navigationService.navClosed.emit();
    }
  }

  // event listener for screen resize
  @HostListener('window:resize')
  onWindowResize() {
    if(this.open){
      // check the viewport everytime the user resize the screen
      if(this.viewportService.breakpoint === 'desktop'){
        // if the screen is large (desktop), toggle the hamburger menu
        this.open = !this.open;
      }
    }
  }

}
