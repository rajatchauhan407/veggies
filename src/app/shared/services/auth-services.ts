import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import {environment} from "../../../environments/environment";
import { User } from "../models/user.model";
const BACKEND_URL= environment.Url;

@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private http:HttpClient){
    }
    /********** Request to create User ************/
    createUser(phoneNo:string){
        const user:User={contact:phoneNo};
        console.log(user);
       return this.http.post<User>(BACKEND_URL+"/signUp",user);
    }
    /****************Request to Login from the User ***********/
    loginService(phoneNo){
      const user:User={contact:phoneNo};
      // console.log(user);
      return this.http.post<User>(BACKEND_URL+"/login",user);
    }
    /************* Checking Phone of User OR Phone Number Validation */
    phonenumber(inputtxt){
        let phoneno:RegExp = /^\d{10}$/;
        if(inputtxt.match(phoneno)){
            return true;
              }
            else
              {
              return false;
              }
      } 
      checkGit(){
        console.log('checkGit');
      } 
    
}