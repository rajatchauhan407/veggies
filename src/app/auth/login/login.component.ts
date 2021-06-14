import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-services';
import { OtpLoginComponent } from './otp-login/otp-login.component';

@Component({
  selector: 'install-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public signIn: FormGroup;
  public authResponse;
  public isLoading: boolean = false;
  public errorMessage: boolean;
  constructor(
    private authService: AuthService,
    private dialogue: MatDialog,
    private router: Router
  ) {}

  openDialogue(): void {
    const dialogRef = this.dialogue.open(OtpLoginComponent, {
      width: '70%',
      data: {
        otp:this.authResponse.otp,
        token: this.authResponse.token,
        expiresIn: this.authResponse.expiresIn
      },
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      (result) => {
        // const expiresInduration= this.authResponse.expiresIn;
        // const token = this.authResponse.token;    
        // this.authService.token = token;           //putting value of token in present in AuthService
        // this.authService.setAuthTimer(expiresInduration);
        // const now = new Date();
        // const expirationDate= new Date(now.getTime() + expiresInduration*1000);
        // this.authService.saveAuthData(token,expirationDate);
        // // this.authService.authStatusListener.next(true);
        // this.authService.isAuth= true;
        this.router.navigate(['']);
      },
      (error) => {
        this.authService.isAuth= false;
        console.log(error);
      }
    );
  }

  getUserOtp(conValue) {
    const promise = new Promise((resolve, reject) => {
      this.authService.loginService(conValue).subscribe(
        (response) => {
          console.log(response);
          resolve(response);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
    return promise;
  }

  checkPhoneNumber(control: FormControl): { [s: string]: boolean } {
    let inputtxt: string = control.value;
    if (this.authService.phonenumber(control.value) === false) {
      return { IncorrectPhoneNumber: true };
    }
    return null;
  }
  ngOnInit(): void {
    this.signIn = new FormGroup({
      contact: new FormControl('', [
        Validators.required,
        this.checkPhoneNumber.bind(this),
      ]),
    });
  }
  onSubmit() {
    this.isLoading = true;
    console.log(this.signIn.value.contact);
    const phoneNo = this.signIn.value.contact;
    this.getUserOtp(phoneNo).then((response:any) =>{
      console.log(response);
      if(response.token){
        this.isLoading= false;
        this.authResponse= response;
        this.openDialogue();
      }
    }).catch(error =>{
      this.isLoading=false;
      this.errorMessage= true;
      console.log(error.error.message);
        setTimeout(()=>{
        this.router.navigate(['/signup']);
        },2000);
    });
  }
}
