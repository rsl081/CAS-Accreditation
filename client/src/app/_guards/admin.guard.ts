import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, ReplaySubject, switchMap, take } from 'rxjs';
import { IUser } from '../shared/models/user';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.accountService.currentUser$.pipe(
      map((user) => {
        console.log(this.accountService.currentUser$);

        if (user.role === 'Admin') {
      
          this.toaster.success('Login Successful!');

          return true;
        }

        this.toaster.error("You don't have permission to access that resource");

        this.router.navigate(['/'], {
          queryParams: {
            returnUrl: state.url,
          },
        });

        this.accountService.logout();
        return false;
      })
    );
  }
}
