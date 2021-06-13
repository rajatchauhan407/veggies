import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth-services';

@Component({
  selector: 'install-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() sidenavToggle= new EventEmitter<void>();
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onToggle(){
 this.sidenavToggle.emit();
  }
  logout(){
      this.authService.logout();
  }
}
