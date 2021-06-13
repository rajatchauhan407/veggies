import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProdcutService } from 'src/app/shared/services/productService';
import { ChooseQuantityPopUpComponent } from './choose-quantity-pop-up/choose-quantity-pop-up.component';

@Component({
  selector: 'install-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  image:string="https://thumbs-prod.si-cdn.com/4mx7KqwcaknXaWkTxS1Bt-Rqz9E=/fit-in/1600x0/https://public-media.si-cdn.com/filer/44/de/44de0f61-47cb-4289-aaf0-73e71d39fefb/2962762666_1237ff6eb4_o.jpg";
   public responseData=[];
  
  constructor(private dialogue:MatDialog, private productService:ProdcutService) {

   }

  ngOnInit(): void {
    this.productService.getPrices();
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
