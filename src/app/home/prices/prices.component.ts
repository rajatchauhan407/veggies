import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VegData } from 'src/app/shared/models/vegData.model';
import { ProdcutService } from 'src/app/shared/services/productService';
import { VegDataService } from 'src/app/shared/services/vegData.service';
import { ChooseQuantityPopUpComponent } from './choose-quantity-pop-up/choose-quantity-pop-up.component';

@Component({
  selector: 'install-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  public vegData:any;
  image:string="https://thumbs-prod.si-cdn.com/4mx7KqwcaknXaWkTxS1Bt-Rqz9E=/fit-in/1600x0/https://public-media.si-cdn.com/filer/44/de/44de0f61-47cb-4289-aaf0-73e71d39fefb/2962762666_1237ff6eb4_o.jpg";
   public responseData=[];
  
  constructor(private dialogue:MatDialog,
     private productService:ProdcutService,
     private vegDataService:VegDataService) {
     
   }

  ngOnInit(): void {
    this.vegDataService.vegDataRes().then((response:any)=>{
      this.vegData = response.response;
    }).catch(error=>{
      console.log(error);
    });
  }
  openDialogue(veg):void{
    const dialogRef = this.dialogue.open(ChooseQuantityPopUpComponent,{data:{
      vegImage:this.image,
      vegData:veg
    }});
    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
    });
  }

}
