import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'install-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUp:FormGroup;
 ContactNumber;
  constructor() { }

  onSubmit(){
    
      console.log(this.signUp);
      console.log(this.phonenumber(this.signUp.value.contact));
    
  }
  ngOnInit(): void {
    this.signUp=new FormGroup({
      'contact':new FormControl('',[Validators.required,this.checkPhoneNumber.bind(this)])
    });
  }
checkPhoneNumber(control:FormControl):{[s:string]:boolean} {
    // let inputtxt:string=control.value;
    if(this.phonenumber(control.value)===false){
      return {'IncorrectPhoneNumber':true}
    }
    return null;
    ;
}  
phonenumber(inputtxt){
  let phoneno:RegExp = /^\d{10}$/;
  if(inputtxt.match(phoneno)){
      return true;
        }
      else
        {
        return false;
        }
}

}
