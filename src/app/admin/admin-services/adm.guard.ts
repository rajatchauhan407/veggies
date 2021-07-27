import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth-services';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdmGuard implements CanActivate {
  constructor(private adminService:AdminService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth = this.adminService.isAdmin;
      if(!isAuth){
          this.router.navigate(['/admin']);
      }
      console.log(isAuth);
      return isAuth;
  }
  
}
