import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'install-choose-quantity-pop-up',
  templateUrl: './choose-quantity-pop-up.component.html',
  styleUrls: ['./choose-quantity-pop-up.component.css']
})
export class ChooseQuantityPopUpComponent implements OnInit {
  quantity:Number[]=[1,2,3,4,5];
  selectedQuantity:Number;
  image:string;
  constructor(@Inject(MAT_DIALOG_DATA) public img:any) { 
    this.image=this.img.vegImage;
  }

  ngOnInit(): void {
  }

}
