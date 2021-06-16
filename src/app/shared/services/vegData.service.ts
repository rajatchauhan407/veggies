import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VegData } from "../models/vegData.model";
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.Url;
@Injectable({
    'providedIn':'root'
})
export class VegDataService{
   private vegData:VegData;
    constructor(private http:HttpClient){}
/**************Getting Veg Data *******/    
    
/***********Request to VegData *********/
    vegDataRes(){
        const promise = new Promise((resolve,reject)=>{
            this.http.get<VegData>(BACKEND_URL + "/prices").subscribe(response=>{
                resolve(response);
            },(error)=>{
                console.log(error);
                reject(error);
            })
        });
        console.log(promise);
        return promise;
        }

}