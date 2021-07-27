import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { resolve } from 'dns';
import { FlexFlowContext } from 'twilio/lib/rest/flexApi/v1/flexFlow';
import { AuthService } from '../shared/services/auth-services';
import { VegDataService } from '../shared/services/vegData.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'install-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {
  subTotal;
  lengthPage=10;
  currentPage=1;
  postsPerPage=10;
  pageSizeOptions=[2,3,6,9];
  public vegData;
  userId:string;
  image1:string="https://images.unsplash.com/photo-1576856497337-4f2be24683da?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=682&q=80";
  constructor(private vegDataService:VegDataService,
              private authService : AuthService,
              private dialog: MatDialog,
              private router:Router) { }

  ngOnInit(): void {
    /*******Promise Chaining  ***********/
     this.getBucketData();
  }
  /********** Opening the dialog Box ********/
  openDialog():void
  {
     const dialogRef = this.dialog.open(ConfirmDialogComponent,{
       width: "100%",
       height: "auto",
       data :{
        vegData: this.vegData,
        subTotal : this.subTotal,
        userId : this.userId
       }
     }
      );

      dialogRef.afterClosed().subscribe(result => {
          
      });
  }
  /*****Changing Page through pagination */  
  onChangePage(pageEvent : PageEvent){
    this.postsPerPage = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex +1;
    this.getBucketData();
  }
  /************Getting Bucket Data **********/
  getBucketData(){
    this.authService.getId().then((result:any) => {
      this.userId = result.userId;
      return result.userId;
    }).then((result)=>{
    const promise =  this.vegDataService.getDataFromBucket(result,this.postsPerPage,this.currentPage);
    return promise;
    }).then((result:any )=>{
      this.vegData = result.response;
      this.lengthPage = result.bucketCount;
      this.subTotal = result.subTotal;
      console.log(this.vegData);
    }).catch(error =>{
      console.log("something went wrong");
    });
  }
  /********* Deleting Veg From bucket *****/
  onRemove(id){
    console.log(id);
    this.vegDataService.deleteFromBucket(id).subscribe((res)=>{
     this.getBucketData();
    },error =>{
      console.log(error);
    })
  }
}
