import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-services';
import { OtpDialogComponent } from './otp-dialog/otp-dialog.component';

@Component({
  selector: 'install-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
public signUp:FormGroup;
public otp;
public enteredOtp;
public errorMessage = false;
public isLoading:boolean = false;
public contactNumber;
private authResponse;

  constructor(private authService:AuthService, 
              private dialogue:MatDialog,
              private router:Router){

   }
   openDialogue():void{
    const dialogRef = this.dialogue.open(OtpDialogComponent,{
      width:"70%",
      data:{
      otp:this.authResponse.otp,
      token: this.authResponse.token,
      expiresIn: this.authResponse.expiresIn                      
    }});
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result=>{
      this.authService.autoAuthUser();
        this.router.navigate(['']);
    },error=>{
      console.log(error);
    });
  }
  getUserOtp(conValue){
    const promise= new Promise((resolve,reject)=>{
      this.authService.createUser(conValue).subscribe(
        response=>{
            console.log(response);
            resolve(response);
        },
        error=>{
          console.log(error);
          reject(error);
        }
    );
    });
    return promise;
  }
  onSubmit(){
      this.contactNumber = this.signUp.value.contact;
      const conValue = this.signUp.value.contact;
     
      // console.log(this.phonenumber(this.signUp.value.contact));
      this.isLoading = true;
      this.getUserOtp(conValue).then(
        response=>{
          this.isLoading = false;
          this.authResponse = response;
          this.openDialogue();
        }
      ).catch(
        error=>{
          if(error.error.message == "user already exists"){
            this.errorMessage = true;
            setTimeout(()=>{
              this.router.navigate(['/login']);
            },2000);
          }
          this.isLoading=false;
          console.log(error);
        }
      )
      
  }
  ngOnInit(): void {
    this.signUp=new FormGroup({
      'contact':new FormControl('',[Validators.required,this.checkPhoneNumber.bind(this)])
    });
  }
  checkPhoneNumber(control:FormControl):{[s:string]:boolean} {
    let inputtxt:string=control.value;
    if(this.authService.phonenumber(control.value)===false){
      return {'IncorrectPhoneNumber':true}
    }
    return null;
    ;
}


}
