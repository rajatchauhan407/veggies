import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { VegData } from 'src/app/shared/models/vegData.model';
import { AuthService } from 'src/app/shared/services/auth-services';
import { ProdcutService } from 'src/app/shared/services/productService';
import { VegDataService } from 'src/app/shared/services/vegData.service';
import { ChooseQuantityPopUpComponent } from './choose-quantity-pop-up/choose-quantity-pop-up.component';

@Component({
  selector: 'install-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit, OnDestroy {
  public vegData:any;
  authIdSub:Subscription;
  public userId;
  image:string="https://thumbs-prod.si-cdn.com/4mx7KqwcaknXaWkTxS1Bt-Rqz9E=/fit-in/1600x0/https://public-media.si-cdn.com/filer/44/de/44de0f61-47cb-4289-aaf0-73e71d39fefb/2962762666_1237ff6eb4_o.jpg";
   public responseData=[];
  
  constructor(private dialogue:MatDialog,
     private vegDataService:VegDataService,
     private authService:AuthService) {
     
   }
  ngOnDestroy(): void {
    // this.authIdSub.unsubscribe();
  }

  ngOnInit(): void {
    console.log("Hello");
    this.vegDataService.vegDataRes().then((response:any)=>{
      console.log(response);
      this.vegData = response.response;
      this.userId = response.userId;
      this.authService.setUserId(this.userId);
      console.log(this.userId);
    }).catch(error=>{
      console.log(error);
    });

  //  console.log(this.authService.getUserId());
  }
  
  openDialogue(veg):void{
    const dialogRef = this.dialogue.open(ChooseQuantityPopUpComponent,{data:{
      vegImage:this.image,
      vegData:veg,
      userId:this.userId
    }});
    dialogRef.afterClosed().subscribe(result=>{
    });
  }

}
