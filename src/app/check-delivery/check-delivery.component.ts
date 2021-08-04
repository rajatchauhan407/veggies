import { HttpClient } from '@angular/common/http';
import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import {} from 'google.maps';

@Component({
  selector: 'install-check-delivery',
  templateUrl: './check-delivery.component.html',
  styleUrls: ['./check-delivery.component.css']
})
export class CheckDeliveryComponent implements OnInit {
  @ViewChild('map') mapElement;
  @ViewChild('get') el;
  map: google.maps.Map;
  posObj;
  data;
  distance:any;
  result:boolean = false;
  message:string='';
  constructor(private http:HttpClient) { 
    
  }
  ngOnInit(): void {
  
  
}
checkDelivery(){
  navigator.geolocation.getCurrentPosition((success) => {console.log(success);
    this.posObj = success.coords;
    const origin = new google.maps.LatLng(31.296614,75.639782);
    const destination = new google.maps.LatLng(this.posObj.latitude,this.posObj.longitude);
    let service = new google.maps.DistanceMatrixService();
   service.getDistanceMatrix({
      origins:[origin],
      destinations:[destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways:false,
      avoidTolls:false
    }).then((response)=>{
      this.result = true;
      this.data = response;
      console.log(this.data.rows[0].elements[0].distance.text);
      this.distance = this.data.rows[0].elements[0].distance.text;
      const str = this.distance.split(' ');
      console.log(str[0]);
      this.checkDistance(str[0]);
    });
  },error => console.log(error),{enableHighAccuracy:true});
}  
checkDistance(distance){
  if(distance>5){
    this.message = "We are Sorry ! Service not available right now";
  }else if(distance<5){
    this.message = "We can provide services";
  }
}
  // getElements(latitude,longitude){
  //   const mapProperties = {
  //     center: new google.maps.LatLng(latitude, longitude),
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  // };
  
  // const map = new google.maps.Map(document.getElementById('map') as HTMLElement,mapProperties);
    
  //   new google.maps.Marker({
  //     position: {lat:latitude, lng:longitude},
  //     map,
  //     title: "Hello World!",
  //   });
  //   new google.maps.Marker({
  //     position: {lat:31.29986000000002, lng:75.63840053995631},
  //     map,
  //     title: "Hello World!",
  //   })
  // }
}
// if script doesnt work