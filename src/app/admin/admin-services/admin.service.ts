import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth-services";
import { environment } from "src/environments/environment";

const BACKEND_URL = environment.Url;
@Injectable({
    providedIn:'root'
})
export class AdminService{

    constructor(private http:HttpClient, 
            private authService:AuthService,
            private router:Router){}
    isAuthenticate(authData){
        const promise = new Promise((resolve,reject)=>{
            this.http.post<any>(BACKEND_URL+"/adminAuth",authData).subscribe(result =>{
                 const now = new Date();
                 const expirationDate= new Date(now.getTime() + result.expiresIn*1000);
                 this.authService.saveAuthData(result.token,expirationDate);
                 this.authService.setAuthTimer(result.expiresIn);
                 resolve(result);
            });
        });
        return promise;
    }

    getPrices(){
        const promise = new Promise((resolve,reject) => {
            this.http.get(BACKEND_URL + '/admin-prices').subscribe(result => {
               resolve(result);
            });
        });
        return promise;
    }
    
}