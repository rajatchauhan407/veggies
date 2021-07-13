import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from './log.service';
@Component({
  selector: 'install-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  constructor(private router: Router, private logService: LogService) { }
  loginForm:FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')
    })    
  }

  onSubmit(){
    console.log(this.loginForm);
    if (this.loginForm.value.userName == 'promatics' && this.loginForm.value.password == "promatics"){
      this.logService.authcheck= true;
      this.router.navigate(["/dashboard"]);
    }

  }
 

 
}
