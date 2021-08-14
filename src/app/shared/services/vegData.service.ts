import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
import { Subject } from "rxjs";
import { VegData } from "../models/vegData.model";
import { Bucket } from "../models/bucket.model";
import {tap} from "rxjs/operators";

const BACKEND_URL = environment.Url;
@Injectable({
    'providedIn':'root'
})
export class VegDataService{
   private vegData:VegData;
   contents;
   bucketDataEmitter = new Subject<Bucket>();
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
        // console.log(promise);
        return promise;
        }
/**********************Sending Data to Bucket ***************/
        sendDataToBucket(bucketData){
            const promise = new Promise((resolve,reject)=>{
            this.http.post<any>(BACKEND_URL + "/bucket",bucketData).subscribe((res)=>{
                // console.log(res);
                    resolve(res);
                },(error) => {
                    reject(error);
                    // console.log(error);
                });
            });
            return promise;
        }
/******************** Getting Data from Bucket ************/
        getDataFromBucket(userId, postsPerPage, currentPage){
            let searchParams = new HttpParams();
            searchParams = searchParams.append('id',userId);
            searchParams = searchParams.append('pageSize',postsPerPage);
            searchParams = searchParams.append('currentPage',currentPage);
    const promise = new Promise((resolve,reject)=>{
        this.http.get<any>(BACKEND_URL + "/bucket",{
            params: searchParams
        }).subscribe(response =>{
            // console.log(response);
           resolve(response);
        },error =>{
            reject(error);
        }); 
    });
    return promise;
        }
/*************Deleting Bucket data ********/
    deleteFromBucket(id){
      return  this.http.delete(BACKEND_URL + '/bucket/delete',{
            params: new HttpParams().set('id', id)
        });
    }
    /*****************Calculate Sub-Total of Bucket ***********/    
    orderConfirmed(data,subtotal,userId){
        const orderData={
            order : data,
            userId:userId,
            orderTotal: subtotal
        };
        const promise = new Promise((resolve, reject) =>{
            this.http.post(BACKEND_URL + "/orders/confirmOrder",orderData).subscribe((response:any)=>{
                console.log(response);
                resolve(response);
            });
        });
        return promise;
    }
    /**************Get Orders *************/
    getOrders(userId, postsPerPage, currentPage){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('id',userId);
        searchParams = searchParams.append('pageSize',postsPerPage);
        searchParams = searchParams.append('currentPage',currentPage);
        const promise = new Promise((resolve, reject)=>{
            this.http.get<any>(BACKEND_URL + "/orders",{
                params: searchParams
            }).subscribe((result:any) =>{
                // console.log(result);
                resolve(result);
            }, error => {
                console.log(error);
                reject(error);
            })
        });
        return promise;
    }
    /****************Get Invoice for orders *******/
    getInvoice(orderId,userId):any{
        const promise =new Promise((resolve,reject)=>{
            let searchParams = new HttpParams();
        searchParams = searchParams.append('orderId',orderId);
        searchParams = searchParams.append('userId',userId);
        this.http.get(BACKEND_URL + "/orders/getInvoice",{
            params:searchParams,
            responseType:"blob"
        }).pipe(tap(data => {})).subscribe((result:any) =>{
            this.contents = result;
            resolve(this.contents);
            console.log(this.contents);
        },error => {
            console.log(error);
        });
        });
        return promise;
    }
/************** Deleting Bucket After Order **********/
deleteBucket(id){
    const data = {
        'id' : id
    }
    this.http.post(BACKEND_URL + "/delete-bucket",data).subscribe(result =>{
            console.log(result);
    });
}
}

