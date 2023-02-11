import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  isPulse = false;
  roleIndicators = [
    { user: 'Admin', active: true },
    { user: 'Faculty', active: false },
    { user: 'Accreditor', active: false },
  ];
  userType = this.roleIndicators[0].user; // default

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  toggleBtn(user: string) {
    this.isPulse = true
    this.userType = user;
    this.roleIndicators.forEach((roleIndicator) => {
      if (roleIndicator.user === user) {
        roleIndicator.active = true;
      } else {
        roleIndicator.active = false;
      }
    });
  }
  
  setActiveTabToFalse() {
    this.isPulse = false
  }

  getActiveTab(): Boolean {
    return this.isPulse;
  }

  togglePasswordVisibility(input: HTMLInputElement): void{
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

  createLoginForm(): void{
    this.loginForm = this.formBuilder.group({
      email: [null, [ Validators.required ]],
      password: [null,[ Validators.required ]],
    });
  }

  isFormValid(): boolean {
    if (this.loginForm.controls['email'].status === 'INVALID') {
      return false;
    } else if (this.loginForm.controls['password'].status === 'INVALID') {
      return false;
    } else {
      return true;
    }
  }

  onSubmit(): void{
    if (this.isFormValid()){
      let credentials = {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      }
      
    
      this.accountService.login(credentials).subscribe({
        error: () => this.toaster.error('Unauthorized'),
        complete: () => {
          this.navigateToNextRoute();
        }
      })
    }
  }

  navigateToNextRoute(): void{
    switch(this.userType){
      case 'Admin':
        this.router.navigate(['admin']);
        break;
      case 'Faculty':
        this.router.navigate(['faculty']);
        break;
      case 'Accreditor':
        this.router.navigate(['accreditor']);
        break;
    }
  }

  forgotPassword(){
    this.router.navigateByUrl('forgot-password');
  }
}
