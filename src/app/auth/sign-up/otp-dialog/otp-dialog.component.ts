import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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
  constructor(@Inject(MAT_DIALOG_DATA) public passedOtp:any, 
              private router:Router,
              public dialogRef:MatDialogRef<OtpDialogComponent>) {
    // console.log(this.passedOtp.otp);
    this.otp = this.passedOtp.otp.otp;
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
   

  ngOnInit(): void {
  }
}
