import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-services';
@Component({
  selector: 'install-otp-login',
  templateUrl: './otp-login.component.html',
  styleUrls: ['./otp-login.component.css'],
})
export class OtpLoginComponent implements OnInit {
  public otp;
  public checkOtp:boolean=true;
  @ViewChild('enteredOtp') enteredOtp:ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private router: Router,
    public dialogRef: MatDialogRef<OtpLoginComponent>,
    private authService:AuthService,
    private http:HttpClient
  ) {
    this.otp = this.passedData.otp;
  }
  verifyOtp(){
    const promise = new Promise((resolve,reject)=>{
     this.authService.otpVerification(this.enteredOtp.nativeElement.value).subscribe(response =>{
       console.log(response);
       resolve(response);
     },error=>{reject(error)})
    }).catch(error=>{
      console.log(error);
    });
    return promise;
  }
  beforeClosed(){
    
    let tempOtp = this.enteredOtp.nativeElement.value;
    if(this.otp == tempOtp){
      this.checkOtp=true;
      const expiresInduration = this.passedData.expiresIn;
      const now = new Date();
      const expirationDate= new Date(now.getTime() + expiresInduration*1000);
      this.verifyOtp().then(
        (res:any) => {
          
          if(res.result == true){
            this.authService.saveAuthData(this.passedData.token,expirationDate);
            this.authService.setAuthTimer(expiresInduration);
            console.log(res);
            this.dialogRef.close();
          }
        }
      )
    }else{
      this.checkOtp = false;
    }
   }
  ngOnInit(): void {}
}
