import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin-services/admin.service';

@Component({
  selector: 'install-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  public signIn: FormGroup;
  public authResponse;
  public isLoading: boolean = false;
  public errorMessage: boolean;
  public counter=0;
  @ViewChild('password') password:ElementRef;
  password1;
  constructor(private adminService:AdminService,
              private router:Router) { 
  }
  
  handleKeyDown(event:KeyboardEvent){
  this.counter++;
  console.log(this.counter);
  }
  ngOnInit(): void {
    this.signIn = new FormGroup({
      email: new FormControl('', [
        Validators.required,Validators.email
      ]),
      password: new FormControl('',[Validators.required, Validators.minLength(4)])
    });
  }
  togglePassword(){
    console.log(this.password.nativeElement.value);
    if(this.password.nativeElement.type=="password"){
      this.password.nativeElement.type="text";
    }else{
      this.password.nativeElement.type="password";
    }
  }
  onSubmit(){
    const authData = {
      email: this.signIn.get('email').value,
      password:this.signIn.get('password').value
    }
    this.adminService.isAuthenticate(authData).then(result =>{
      this.router.navigate(['/admin/update-prices']);
    });
  }

}
