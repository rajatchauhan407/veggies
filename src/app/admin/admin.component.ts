import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'install-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  authenticated:boolean = false;
  constructor() { 
  }

  ngOnInit(): void {
  }

}
