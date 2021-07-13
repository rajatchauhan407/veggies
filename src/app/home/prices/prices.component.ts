import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin/admin-services/admin.service';
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
  image:string;
  public isAdmin:boolean = false;
   public responseData=[];
  
  constructor(private dialogue:MatDialog,
     private vegDataService:VegDataService,
     private authService:AuthService,
     private route: ActivatedRoute,
     private adminService:AdminService,
     private router:Router) {
     
   }
  ngOnDestroy(): void {
    // this.authIdSub.unsubscribe();
  }

  ngOnInit(): void {
    console.log("Hello");
    this.route.url.subscribe(result => {
      console.log(result[1]);
      if(result[0].path == 'admin'){
        this.isAdmin = true;
      }
    });
    if(this.isAdmin){
      this.adminService.getPrices().then(
        (response:any) =>{
          console.log(response);
          this.vegData = response.response;
        this.userId = response.userId;
        this.authService.setUserId(this.userId);
         console.log(this.userId);
        }
      )
    }else {
      this.vegDataService.vegDataRes().then((response:any)=>{
        console.log(response);
        this.vegData = response.response;
        this.userId = response.userId;
        this.authService.setUserId(this.userId);
        console.log(this.userId);
      }).catch(error=>{
        console.log(error);
      });
    }
  //  console.log(this.authService.getUserId());
  }
  editVege(vegId){
  console.log(vegId);
  this.router.navigate(['admin/add-vege'],{queryParams:{id:vegId}});
  }
  openDialogue(veg):void{
    const dialogRef = this.dialogue.open(ChooseQuantityPopUpComponent,{data:{
      // vegImage:this.image,
      vegData:veg,
      userId:this.userId
    }});
    dialogRef.afterClosed().subscribe(result=>{
    });
  }
}
