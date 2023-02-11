import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, PatternValidator, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { concatMap, from, map, Observable, of, switchMap, timer } from 'rxjs';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-admin-create-account',
  templateUrl: './admin-create-account.component.html',
  styleUrls: ['./admin-create-account.component.css'],
})
export class AdminCreateAccountComponent implements OnInit {
  
  registrationForm: FormGroup;
  showDropdownMenu = false;
  default: string = 'Options';
  selectedUserType!: string;
  isItemSelected = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private toastr: ToastrService,
  ) {}


  ngOnInit(): void {
    this.selectedUserType = this.default;
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registrationForm = this.fb.group({
      name: [
        null,
        [Validators.required, Validators.pattern('^([A-Za-z0-9]\\s?)+([,]\\s?([A-Za-z0-9]\\s?)+)*$')],
      ],

      email: [
        null,
        [ Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$') ],
        [this.validateEmailNotTaken()],
      ],

      password: [
        null,
        [ Validators.required,
          Validators.pattern("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$")
        ],
      ],
    });
  }

  toggleDropdownMenu() {
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  onUserTypeSelect(itemRef: HTMLAnchorElement) {

    this.selectedUserType = 'Options'
    
    switch (itemRef.textContent) {
      
      case 'Faculty':
        this.selectedUserType = itemRef.textContent;
        this.toggleDropdownMenu();
        this.isItemSelected = true;
        break;

      case 'Accreditor':
        this.selectedUserType = itemRef.textContent;
        this.toggleDropdownMenu();
        this.isItemSelected = true;
        break;
      case 'Admin':
        this.selectedUserType = itemRef.textContent;
        this.toggleDropdownMenu();
        this.isItemSelected = true;
        break;
      default:
        alert('There was a problem processing your request');
    }

  }

  setButtonLabel(): string {
    if (this.selectedUserType === 'Faculty') {
      return 'Next';
    } else {
      return 'Submit';
    }
  }

  togglePasswordVisibility(checkbox: HTMLInputElement) {
    if (checkbox.type === 'password') {
      checkbox.type = 'text';
    } else {
      checkbox.type = 'password';
    }
  }

  isFormValid(): boolean {
    if (this.registrationForm.controls['name'].status === 'INVALID') {
      return false;
    } else if (this.registrationForm.controls['email'].status === 'INVALID') {
      return false;
    } else if (
      this.registrationForm.controls['password'].status === 'INVALID'
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control) => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map((res) => {
              return res ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }

  onSubmit() {

    if (this.isFormValid()) {
      if (this.selectedUserType === 'Faculty') {

        this.router.navigate(['select-area'], {
          relativeTo: this.route,
          state: {
            data: {
              name: this.registrationForm.controls['name'].value,
              email: this.registrationForm.controls['email'].value,
              password: this.registrationForm.controls['password'].value,
              userType: this.selectedUserType,
            },
          },
        });
 
      }

      if (this.selectedUserType === 'Admin') {

        this.onRegisterAdmin()

      }

      if (this.selectedUserType === 'Accreditor') {

        this.onRegisterAccreditor()

      }

      this.selectedUserType = this.default;
      this.isItemSelected = false;
      this.registrationForm.reset();
    
    }

  }

  onRegisterAdmin() {
  
    let body = {
      pictureUrl: 'img/user_icon_default.png ',
      displayName: this.registrationForm.controls['name'].value,
      email: this.registrationForm.controls['email'].value,
      password: this.registrationForm.controls['password'].value,
    };

    this.accountService.registerAdmin(body).subscribe({
      next: (response: IUser) => {

        console.log("User Id " + response.id);
        
      },
      complete: () => {
        
        this.toastr.success('Register successfully!')

      },

      error: (error) => console.log(error),
    });

  }

  onRegisterAccreditor() {

    let body = {
      pictureUrl: 'img/user_icon_default.png ',
      displayName: this.registrationForm.controls['name'].value,
      email: this.registrationForm.controls['email'].value,
      password: this.registrationForm.controls['password'].value,
    };

    this.accountService.registerAccre(body).subscribe({
      next: (response: IUser) => {

        console.log("User Id " + response.id);
        
      },
      complete: () => {
        
        this.toastr.success('Register successfully!')

      },

      error: (error) => console.log(error),
    });

  }


}