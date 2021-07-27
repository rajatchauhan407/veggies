import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin/admin-services/admin.service';
import { AuthService } from 'src/app/shared/services/auth-services';

@Component({
  selector: 'install-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  isAuthenticated:boolean = false;
  isAuthSub:Subscription;
  checkAdmin:boolean;
  @Output() sidenavToggle= new EventEmitter<void>();
  isAdminSub: Subscription;
  constructor(private authService:AuthService,
              private adminService:AdminService) { }
  ngOnDestroy(): void {
    this.isAuthSub.unsubscribe();
    this.isAdminSub.unsubscribe();
  }

  ngOnInit(): void {
    this.checkAdmin = this.adminService.isAdmin;
    this.isAuthenticated =this.authService.isAuth;
    this.isAuthSub = this.authService.authSub.subscribe(result =>{
       this.isAuthenticated = result;
       console.log(this.isAuthenticated);
     });
     this.isAdminSub = this.adminService.adminAuth.subscribe(result =>{
      this.adminService.setCheckAdmin(result);
      this.checkAdmin = this.adminService.getCheckAdmin();
      });
    }

  onToggle(){
 this.sidenavToggle.emit();
  }
  logout(){
      this.isAuthenticated = false;
    this.checkAdmin = false;
    this.adminService.setCheckAdmin(false);
    this.adminService.logout();
  }
}
