import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-services/admin.service';

@Component({
  selector: 'install-update-prices',
  templateUrl: './update-prices.component.html',
  styleUrls: ['./update-prices.component.css']
})
export class UpdatePricesComponent implements OnInit {

  constructor(private adminService:AdminService) { 
      this.adminService.getPrices().then(result => {
        console.log(result);
      });
  }

  ngOnInit(): void {
  }

}
