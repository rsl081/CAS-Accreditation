import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, of, switchMap, timer } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForgotPasswordForm();
  }

  createForgotPasswordForm(){
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [ Validators.required ], 
      [this.validateEmailExistense()]]
    });
  }

  validateEmailExistense(): AsyncValidatorFn {
    return (control) => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map((res) => {
              return res ? null: { emailNotFound: true };
            })
          );
        })
      );
    };
  }

  isFormValid(){
    if (this.forgotPasswordForm.controls['email'].status === 'INVALID') {
      return false;
    }
    return true;
  }

  onSubmit(){
    if(this.isFormValid()){
      let body = {
         email: this.forgotPasswordForm.controls['email'].value
      }
      this.accountService.forgotPassword(body).subscribe({
        complete: () => {
          this.router.navigateByUrl('/');
          this.toaster.success('Verification link sent to your email');
        },
        error: error => console.log(error)
      })
    }
  }
}
