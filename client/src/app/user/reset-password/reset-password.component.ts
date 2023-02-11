import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  arePasswordsMatch: boolean = false;
  token: string;
  urlParams: any = {}

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toaster: ToastrService,
    private activeRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void{
  
    this.urlParams.token = this.activeRoute.snapshot.queryParamMap.get('token');
    this.urlParams.userId = this.activeRoute.snapshot.queryParamMap.get('userId');
    this.urlParams.email = this.activeRoute.snapshot.queryParamMap.get('email');
    
    this.createResetPasswordForm()
  }

  createResetPasswordForm(): void{
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: [null, [ Validators.required ]],
      confirmPassword: [null, [ Validators.required ]]
    });
  }

  togglePasswordVisibility(newPass: HTMLInputElement, confirmPass: HTMLInputElement): void{
     if (newPass.type === 'password' && confirmPass.type === 'password') {
      newPass.type = 'text';
      confirmPass.type = 'text';
    } else {
      newPass.type = 'password';
      confirmPass.type = 'password';
    }
  }

  validatePasswordSimilarity(): void{
    let newPassword = this.resetPasswordForm.controls['newPassword'].value;
    let confirmPassword = this.resetPasswordForm.controls['confirmPassword'].value;
    if(newPassword === confirmPassword){
      this.arePasswordsMatch = true;
    }else{
      this.arePasswordsMatch = false;
    }
  }

  isFormValid(): boolean{
    if(!this.arePasswordsMatch || this.resetPasswordForm.status === 'INVALID'){
      return false;
    }else{
      return true;
    }
  }

  onSubmit(): void{
    if(this.isFormValid()){

      let body = {
        userId: this.urlParams.userId,
        token: this.urlParams.token,
        password: this.resetPasswordForm.controls['confirmPassword'].value
      }


      this.accountService.resetPassword(body).subscribe({
        next: response => {
          console.log(response);
          this.toaster.success('Resettting password success');
          this.router.navigateByUrl('/');
        },
        error: error => console.log(error)
      })
    }
  }

}
