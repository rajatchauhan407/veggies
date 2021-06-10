import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseQuantityPopUpComponent } from './choose-quantity-pop-up/choose-quantity-pop-up.component';

@Component({
  selector: 'install-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  image:string="https://thumbs-prod.si-cdn.com/4mx7KqwcaknXaWkTxS1Bt-Rqz9E=/fit-in/1600x0/https://public-media.si-cdn.com/filer/44/de/44de0f61-47cb-4289-aaf0-73e71d39fefb/2962762666_1237ff6eb4_o.jpg";
  image1:string="https://www.awesomecuisine.com/wp-content/uploads/2013/10/brinjals_eggplant_aubergine.jpg";
  image2:string="https://cdn-prod.medicalnewstoday.com/content/images/articles/280/280579/potatoes-can-be-healthful.jpg";
 
  constructor(private dialogue:MatDialog) {

   }

  ngOnInit(): void {
  }
  openDialogue():void{
    const dialogRef = this.dialogue.open(ChooseQuantityPopUpComponent,{data:{
      vegImage:this.image
    }});
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    });
  }

}
