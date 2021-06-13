import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.Url;

@Injectable({
    providedIn:'root'
})
export class ProdcutService{
    constructor(private http:HttpClient){}
 getPrices(){
     let response;
     this.http.get<{message:string}>(BACKEND_URL+'/prices').subscribe(
         response=>{
            console.log(response.message);
            console.log(response);
         }
     );
     return response;
 }
}