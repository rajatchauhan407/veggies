import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'install-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() sidenavToggle= new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onToggle(){
 this.sidenavToggle.emit();
  }
}
