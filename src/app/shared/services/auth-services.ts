import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
const BACKEND_URL = environment.Url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private tokenTimer;
  private token: string;
  private isAuth = false;
  /********** Request to create User ************/
  createUser(phoneNo: string) {
    const user: User = { contact: phoneNo };
    console.log(user);
    return this.http.post<User>(BACKEND_URL + '/signUp', user);
  }
  /**************** Request to Login from the User ***********/
  loginService(phoneNo) {
    const user: User = { contact: phoneNo };
    // console.log(user);
    return this.http.post<User>(BACKEND_URL + '/login', user);
  }
  /******** Checking Phone of User OR Phone Number Validation ********/
  phonenumber(inputtxt) {
    let phoneno: RegExp = /^\d{10}$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }
  //saving data in local storage
  saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }
  //Clearing Auth data in local storage
  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }
  //setting the authentication Timer
  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  // Logging out the User
  logout() {
    this.token = null;
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }
}
