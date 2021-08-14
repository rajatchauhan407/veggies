import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthService } from "src/app/shared/services/auth-services";
import { environment } from "src/environments/environment";

const BACKEND_URL = environment.Url;
@Injectable({
    providedIn:'root'
})
export class AdminService{
 private checkAdmin:boolean = false;
 isAdmin:boolean = false;
 adminAuth = new Subject<boolean>();
    constructor(private http:HttpClient, 
            private authService:AuthService,
            private router:Router){}
    getCheckAdmin(){
        return this.checkAdmin;
    }
    setCheckAdmin(bool){
        this.checkAdmin = bool;
    }
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
                this.adminAuth.next(true);
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
updatePrices(vegetable:string, price:string, image:Blob | string, id:string){
    let vegData;
    const promise = new Promise((resolve,reject) =>{
        console.log(typeof(image));
        if(typeof(image) == 'object'){
            console.log("hello");
             vegData = new FormData();
            vegData.append("vegetable",vegetable);
            vegData.append("price",price);
            vegData.append("image",image);
            vegData.append("id",id);
        }else {
            console.log("hello Else");
            vegData = {
                'vegetable' : vegetable,
                'price' : price,
                'image' : image,
                'id'    : id
            }
        }
        this.http.post(BACKEND_URL+"/updatePrices",vegData).subscribe(result =>{
        console.log(result);
        })
    });
    return promise;
}
/******************Auto Auth Admin **************/
autoAuthUser() {
    const autoAuthInfo = this.authService.getAuthData();
    if (!autoAuthInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = autoAuthInfo.expirationDate.getTime() - now.getTime(); //if the date exists in future
    console.log('Setting Auth Timer' + expiresIn);
    if (expiresIn > 0) {
      this.authService.token = autoAuthInfo.token;
       this.isAdmin = true;
       this.checkAdmin = true;
      // this.adminService.isAdmin = true;
      this.adminAuth.next(true);
      this.authService.setAuthTimer(expiresIn / 1000);
      } else{
      this.authService.clearAuthData();
    }
  }
  /*************** Logout Function **********/
  logout() {
    this.authService.token = null;
    this.authService.clearAuthData();
    clearTimeout(this.authService.tokenTimer);
    this.router.navigate(['/login']);
  }
/*********** Delete Veggies *******/
deleteVeg(id){
    const promise = new Promise((resolve,reject) =>{
        this.http.post(BACKEND_URL + "/delete-veg",{'id':id}).subscribe(result =>{
            console.log(result);
            resolve(result);
        })
    });
    return promise;
}
}