import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseURL = environment.apiUrl;
  public currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  userUpdateNeeded = new Subject<{}>();


  constructor(private http: HttpClient) {}

  registerFaculty(values: any) {
    return this.http.post<IUser>(
      this.baseURL + 'account/faculty/register',
      values
    );
  }

  registerAdmin(values: any) {
    return this.http.post<IUser>(
      this.baseURL + 'account/admin/register',
      values
    );
  }

  registerAccre(values: any) {
    return this.http.post<IUser>(
      this.baseURL + 'account/accreditor/register',
      values
    );
  }

  assignAreaToFaculty(areas: any[], body: {}) {
    areas.forEach((area) => {
      console.log(area.id);
      return this.http.put(this.baseURL + 'areas/' + area.id, body).subscribe({
        next: (response) => console.log(response),
        complete: () => {
          console.log('Assigning success');
        },
        error: (error) => console.log(error),
      });
    });
  }

  checkEmailExists(email: string) {
    return this.http.get(this.baseURL + 'account/emailexists?email=' + email);
  }

  login(credentials: any) {
    return this.http.post(this.baseURL + 'account/login', credentials).pipe(
      map((response: IUser) => {
        let user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user: IUser) {
    if (user !== null) {
      user.role = this.getDecodedToken(user.token).role;
      this.currentUserSource.next(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.setCurrentUser(null);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  verifyEmail(body: any) {
    return this.http
      .post(this.baseURL + 'account/emailconfirmation', body);
  }

  forgotPassword(body: {}) {
    return this.http.post(this.baseURL + 'account/forgotpassword', body);
  }

  resetPassword(body: {}) {
    return this.http.post(this.baseURL + 'account/resetpassword', body);
  }

  editProfileName(body: {}) {
    return this.http.put(this.baseURL + 'account', body);
  }

  
}