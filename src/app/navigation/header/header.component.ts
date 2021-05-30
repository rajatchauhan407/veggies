import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'install-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle=new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  onToggle(){
    this.sidenavToggle.emit();
  }

}
