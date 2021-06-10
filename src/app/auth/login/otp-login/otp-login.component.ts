import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'install-otp-login',
  templateUrl: './otp-login.component.html',
  styleUrls: ['./otp-login.component.css']
})
export class OtpLoginComponent implements OnInit {
  public otp;
  constructor( @Inject( MAT_DIALOG_DATA ) public passedOtp : any, 
  private router : Router,
  public dialogRef : MatDialogRef< OtpLoginComponent >) { 
    this.otp = this.passedOtp.otp.otp;
  }
 
  ngOnInit(): void {
  }

}
