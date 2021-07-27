import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'install-check-delivery',
  templateUrl: './check-delivery.component.html',
  styleUrls: ['./check-delivery.component.css']
})
export class CheckDeliveryComponent implements OnInit {
  posObj;
  constructor() { }

  ngOnInit(): void {
  navigator.geolocation.getCurrentPosition((success) => {console.log(success);
  this.posObj = success.coords},error => console.log(error),{enableHighAccuracy:true});
  }

}
