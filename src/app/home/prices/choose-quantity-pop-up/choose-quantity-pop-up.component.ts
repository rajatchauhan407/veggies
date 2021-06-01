import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'install-choose-quantity-pop-up',
  templateUrl: './choose-quantity-pop-up.component.html',
  styleUrls: ['./choose-quantity-pop-up.component.css']
})
export class ChooseQuantityPopUpComponent implements OnInit {
  quantity:Number[]=[1,2,3,4,5];
  selectedQuantity:Number;
  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
