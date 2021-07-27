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
  spinner:boolean = false;
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
      // console.log(result[1]);
      if(result[0].path == 'admin'){
        this.isAdmin = true;
        this.adminService.setCheckAdmin(true);
        console.log(this.isAdmin);
      }
    });
    console.log(this.isAdmin);
    if(this.isAdmin){
      this.getAdminPrices();
    }else {
      this.getUserPrices();
    }
  //  console.log(this.authService.getUserId());
  }
  getAdminPrices(){
    this.spinner = true;
    this.adminService.getPrices().then(
      (response:any) =>{
      console.log(response);
      this.vegData = response.response;
      this.userId = response.userId;
      this.spinner = false;
      this.authService.setUserId(this.userId);
       console.log(this.userId);
      }
    );
  }

  getUserPrices(){
    this.spinner = true;
    this.vegDataService.vegDataRes().then((response:any)=>{
      console.log(response);
      this.vegData = response.response;
      this.userId = response.userId;
      this.spinner = false;
      this.authService.setUserId(this.userId);
      console.log(this.userId);
    }).catch(error=>{
      console.log(error);
    });
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
  onDelete(id){
    this.adminService.deleteVeg(id).then(result => {
      console.log(result);
      this.getAdminPrices();
    });
  }
}
