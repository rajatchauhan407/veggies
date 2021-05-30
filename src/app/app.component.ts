import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'install-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'a-fresh';
  @ViewChild('sidenav') sidenav:MatSidenav;
  onToggle(){
   this.sidenav.opened=!this.sidenav.opened;
  }
}
