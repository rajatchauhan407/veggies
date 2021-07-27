import { Component, EventEmitter, OnDestroy, OnInit, Output, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin/admin-services/admin.service';
import { AuthService } from 'src/app/shared/services/auth-services';

@Component({
  selector: 'install-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated:boolean = false;
  checkAdmin:boolean;
  isAuthSub:Subscription;
  isAdminSub:Subscription;
  @Output() sidenavToggle=new EventEmitter<void>();
  constructor(private authService:AuthService,
              private adminService:AdminService) { }
  ngOnDestroy(): void {
    this.isAuthSub.unsubscribe();
    this.isAdminSub.unsubscribe();
  }

  ngOnInit(): void {
    
    this.isAuthenticated =this.authService.isAuth;
   this.isAuthSub = this.authService.authSub.subscribe(result =>{
      this.isAuthenticated = result;
      console.log(this.isAuthenticated);
    });
    this.checkAdmin = this.adminService.isAdmin;
    console.log(this.checkAdmin);
    this.isAdminSub = this.adminService.adminAuth.subscribe(result =>{
      this.adminService.setCheckAdmin(result);
      this.checkAdmin = this.adminService.getCheckAdmin();
    });
  }
  onToggle(){
    this.sidenavToggle.emit();
  }
  onLogout(){
    this.isAuthenticated = false;
    this.checkAdmin = false;
    this.adminService.setCheckAdmin(false);
    this.adminService.logout();
  }
}
