import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    @Inject(MAT_DIALOG_DATA) public passedOtp: any,
    private router: Router,
    public dialogRef: MatDialogRef<OtpLoginComponent>
  ) {
    this.otp = this.passedOtp.otp;
  }
  beforeClosed(){
    //  this.dialogRef.close();
    // console.log(this.enteredOtp.nativeElement.value);
    // console.log(this.otp);
    let tempOtp=this.enteredOtp.nativeElement.value;
    if(this.otp==tempOtp){
      this.checkOtp=true;
      this.dialogRef.close();
    }else{
      this.checkOtp=false;
    }
   }
  ngOnInit(): void {}
}
