import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class LogService{
 constructor(){

 }

 authcheck:boolean = false;

 getAuth(){
     return this.authcheck;
 }
}