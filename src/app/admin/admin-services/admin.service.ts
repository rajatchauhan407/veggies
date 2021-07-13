import { HttpClient, HttpParams } from "@angular/common/http";
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
                console.log(result);
                 const now = new Date();
                 const expiresInDuration = result.expiresIn;
                 const token = result.token;
                 const expirationDate= new Date(now.getTime() + expiresInDuration*1000);
                 this.authService.saveAuthData(token,expirationDate);
                 this.authService.setAuthTimer(expiresInDuration);
                console.log(now);
                console.log(expirationDate);
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

    addPrices(vegetable:string, price:string,image:Blob){
        const promise = new Promise((resolve,reject)=>{
            const vegData = new FormData();
            vegData.append("vegetable",vegetable);
            vegData.append("price",price);
            vegData.append("image",image);
            // vegData.append("image",image);
            this.http.post(BACKEND_URL+"/addVeggies",vegData).subscribe(res =>{
                resolve(res);
            }, error => {
                reject(error);
            })
        });
        return promise;
    }
  /******************Get Single VegeTable Data */
  getSingleVegData(id:string){
  const promise = new Promise((resolve,reject) => {
      this.http.get(BACKEND_URL+"/getSingleVeg",{
          params: new HttpParams().set('id', id)
      }).subscribe(response =>{
          resolve(response);
      });
  });
  return promise;
}  
/***************Update Vegetable Prices  **********/

}