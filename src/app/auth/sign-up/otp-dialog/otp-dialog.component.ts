import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth-services';

@Component({
  selector: 'install-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.css']
})
export class OtpDialogComponent implements OnInit {
 
  public otp;
  public wrongOtpMessage="Please Enter Correct OTP";
  public checkOtp:boolean=true;
  @ViewChild('enteredOtp') enteredOtp:ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public passedData:any, 
              private router:Router,
              public dialogRef:MatDialogRef<OtpDialogComponent>,
              private authService:AuthService,
              private http:HttpClient) {
    // console.log(this.passedOtp.otp);
    this.otp = this.passedData.otp;
   }
   verifyOtp(){
     const promise = new Promise((resolve,reject)=>{
       console.log(this.enteredOtp.nativeElement.value);
      this.authService.signUpOtpVerify(this.enteredOtp.nativeElement.value).subscribe(response =>{
        console.log(response);
        resolve(response);
      },error=>{reject(error)})
     }).catch(error=>{
       console.log(error);
     });
     return promise;
   }
   beforeClosed(){
    //  
    // console.log(this.enteredOtp.nativeElement.value);
    // console.log(this.otp);
    let tempOtp=this.enteredOtp.nativeElement.value;
    if(this.otp==tempOtp){
      this.checkOtp=true;
      const expiresInduration = this.passedData.expiresIn;
      const now = new Date();
      const expirationDate= new Date(now.getTime() + expiresInduration*1000);
      
      this.verifyOtp().then(
        (res:any) =>{
          console.log(res);
          if(res.result == true){
            this.authService.saveAuthData(this.passedData.token,expirationDate);
            this.authService.setAuthTimer(expiresInduration);
            this.dialogRef.close();
          }
        }
      )
    }else{
      this.checkOtp=false;
    }
   }
  ngOnInit(): void {
  }
}
