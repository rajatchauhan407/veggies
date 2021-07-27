import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AdminService } from './admin/admin-services/admin.service';
import { AuthService } from './shared/services/auth-services';

@Component({
  selector: 'install-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthService,
              private adminService:AdminService){

  }
  ngOnInit(): void {
    if(localStorage.getItem('id')){
      this.adminService.autoAuthUser();
    }else {
      this.authService.autoAuthUser();
    }  
  }
  title = 'a-fresh';
  @ViewChild('sidenav') sidenav:MatSidenav;
  onToggle(){
    // console.log(this.sidenav);
    this.sidenav.toggle();
  // this.sidenav.opened=!this.sidenav.opened;
  }
}
