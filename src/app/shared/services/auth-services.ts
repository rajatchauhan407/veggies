import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
const BACKEND_URL = environment.Url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private tokenTimer:NodeJS.Timer;
  public token: string;
  public isAuth = false;
  private userId;
  /******************Setting User Id *******/
  setUserId(value){
    this.userId = value
  }
  /******** Getting User Id ********/
  getUserId(){
    return this.userId;
  }
  /***************Getting Token *****/
  getToken() {
    return this.token;
  }
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
  /******** Authentication Getter */
  getIsAuth() {
    return this.isAuth;
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
  // Getting the auth data from localstorage
  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    //if no token then return null
    if (!token) {
      return;
    }
    // if Token is there then accessing data from localstorage and returning it in form of an object
    if (token) {
      return {
        token: token,
        expirationDate: new Date(expirationDate),
      };
    }
  }
  //Automatically authenticate User
  autoAuthUser() {
    const autoAuthInfo = this.getAuthData();
    if (!autoAuthInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = autoAuthInfo.expirationDate.getTime() - now.getTime(); //if the date exists in future
    console.log('Setting Auth Timer' + expiresIn);
    
    if (expiresIn > 0) {
      this.token = autoAuthInfo.token;
      this.isAuth = true;
      this.setAuthTimer(expiresIn / 1000);
      } else{
      this.clearAuthData();
    }
  }
  /******* Otp Verification  ************/
  otpVerification(otp){
    // console.log(otp);
    const otpSent={value:otp}
    return this.http.post<{result:boolean}>(BACKEND_URL + '/verifyOtp', otpSent);
  }
  /*********OTP verification for signing it up ********/
  signUpOtpVerify(otp){
    const otpSent = {value : otp};
    console.log(otpSent);
    return this.http.post<{result:boolean}>(BACKEND_URL + '/verifySignOtp',otpSent);
  }
  /***************Get User Id ****************/
 getId(){
   const promise = new Promise((resolve,reject)=>{
    this.http.get<any>(BACKEND_URL+"/getId").subscribe((res)=>{
      console.log(res);
      resolve(res);
    });
    });
    return promise;
 }
}
