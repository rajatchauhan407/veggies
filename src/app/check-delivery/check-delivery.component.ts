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
  constructor(private http:HttpClient) { 
    
  }
  ngOnInit(): void {
  navigator.geolocation.getCurrentPosition((success) => {console.log(success);
  this.posObj = success.coords;
  const origin = new google.maps.LatLng(30.359089490398716, 76.77673938587336);
  const destination = new google.maps.LatLng(31.307126659018227, 75.59676195223945);

  let service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix({
    origins:[origin],
    destinations:[destination],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways:false,
    avoidTolls:false
  }).then((response)=>{console.log(response)});
  // this.getElements(this.posObj.latitude, this.posObj.longitude);

},error => console.log(error),{enableHighAccuracy:true});
  
}
callback(response,error){

}
ngAfterContentInIt(){
}
  
  getElements(latitude,longitude){
    const mapProperties = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  const map = new google.maps.Map(document.getElementById('map') as HTMLElement,mapProperties);
    
    new google.maps.Marker({
      position: {lat:latitude, lng:longitude},
      map,
      title: "Hello World!",
    });
    new google.maps.Marker({
      position: {lat:31.29986000000002, lng:75.63840053995631},
      map,
      title: "Hello World!",
    })
  }
}
