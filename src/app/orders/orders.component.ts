import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../shared/services/auth-services';
import { VegDataService } from '../shared/services/vegData.service';

@Component({
  selector: 'install-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  lengthPage=10;
  currentPage=1;
  postsPerPage=10;
  pageSizeOptions=[2,3,6,9];
  userId;
  myOrders;
  constructor(private vegDataService:VegDataService,
    private authService:AuthService) { }
  /*****Changing Page through pagination */  
  onChangePage(pageEvent : PageEvent){
    this.postsPerPage = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex +1;
  }
  getOrdersData(){
      this.authService.getId().then((result:any) =>{
        this.userId = result.userId;
        return result.userId;
      }).then(result =>{
        this.vegDataService.getOrders(result,this.postsPerPage,this.currentPage).then(
          (result:any) =>{
            console.log(result);
            this.myOrders = result.data;
          }
        );
      }).catch(error =>{
        console.log(error);
      });
  }
  showDate(gettingDate){
   const d:Date = new Date(gettingDate);
   const month = d.getMonth();
   const year = d.getFullYear();
   const date = d.getDate();
   return `${date}-${month+1}-${year}`;
  }
  ngOnInit(): void {
    this.getOrdersData();
  }

}
