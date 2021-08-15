import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OtpLoginComponent } from 'src/app/auth/login/otp-login/otp-login.component';
import { AuthService } from 'src/app/shared/services/auth-services';
import { VegDataService } from 'src/app/shared/services/vegData.service';

@Component({
  selector: 'install-choose-quantity-pop-up',
  templateUrl: './choose-quantity-pop-up.component.html',
  styleUrls: ['./choose-quantity-pop-up.component.css']
})
export class ChooseQuantityPopUpComponent implements OnInit, OnDestroy {
  quantity:Number[]=[1,2,3,4,5];
  selectedQuantity:Number;
  image:string;
  vegData:any;
  userId:string;
  isAuth:boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef: MatDialogRef<ChooseQuantityPopUpComponent>,
  private vegDataService:VegDataService,
  private authService:AuthService,
  private router:Router) { 
    // this.image=this.data.vegImage;
    this.vegData= this.data.vegData;
    this.userId = this.data.userId;
    console.log(this.data);
  }
  ngOnDestroy(): void {
  
  }
  addToBucket(){
    const bucketVeg={
      vegId : this.vegData._id,
      quantity : this.selectedQuantity,
      price : this.vegData.price,
      userId : this.userId,
      vegName : this.vegData.vegName,
      imagePath:this.vegData.imagePath
    }
    if(this.userId){
      this.vegDataService.sendDataToBucket(bucketVeg).then(res =>{
        console.log(res);
      }).catch(error =>{
        console.log(error);
      })
    }
    // console.log(bucketVeg);
    this.dialogRef.close();
  }
  onLogin(){
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }
  onLogout(){
    this.router.navigate(['/signup']);
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.isAuth = this.authService.isAuth;
  }

}
