import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-faculty-reg-summary',
  templateUrl: './admin-faculty-reg-summary.component.html',
  styleUrls: ['./admin-faculty-reg-summary.component.css'],
})
export class AdminFacultyRegSummaryComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  @ViewChild('formRef', { static: true }) form!: NgForm;
  baseURL = environment.apiUrl;
  user: IUser
  name: string;
  email: string;
  password: string;
  userType: string;
  areaNames: string[] = [];
  areas = [];

  ngOnInit(): void {
    // data from the previous page
    this.name = history.state.data.accountDetails.name;
    this.email = history.state.data.accountDetails.email;
    this.password = history.state.data.accountDetails.password;
    this.userType = history.state.data.accountDetails.userType;
    this.populateArea();

    this.accountService.currentUser$.subscribe({
      next: user => this.user = user,
      error: error => console.error(error)
    });
  }

  onRegister() {
    let body = {
      photoUrl: 'img/user_icon_default.png ',
      displayName: this.name,
      email: this.email,
      password: this.password,
    };

    this.getAreaIds();

    this.accountService.registerFaculty(body).subscribe({
      next: (response: IUser) => {
        console.log(response);
        let body = {
          facultyUserId: response.id.toString(),
          name: this.user.displayName
        };
        this.accountService.assignAreaToFaculty(this.areas, body);
      },
      complete: () => {
        this.toastr.success('Register successfully!');
        this.router.navigateByUrl('admin/create-account')
      },
      error: (error) => console.log(error),
    });
  }

  populateArea() {
    // data from the previous page in form of object
    let areasObject = history.state.data.areas;
    // convert object to array
    let areasArray = Object.keys(areasObject).map((key) => [key, areasObject[key]]);
    areasArray.forEach((element) => {
      // Area n: Title
      this.areaNames.push(element[1].title);
    });
  }

  getAreaIds() {
    let areasObject = history.state.data.areas;
    let areasArray = Object.keys(areasObject).map((key) => [key, areasObject[key]]);

    // not the actual IArea type
    areasArray.forEach((element) => {
      let area  = {
        id: element[1].id,
        levelId: element[1].levelId,
      };
      this.areas.push(area);
    });
  }

  togglePasswordVisibility(input: HTMLInputElement) {
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

  back() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}