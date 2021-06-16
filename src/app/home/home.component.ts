import { Component, OnInit } from '@angular/core';
import { VegData } from '../shared/models/vegData.model';
import { VegDataService } from '../shared/services/vegData.service';

@Component({
  selector: 'install-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public tab1:string="Prices Today";
  public tab2:string="Your Orders";
 
  constructor(private vegDataService:VegDataService) { }

  ngOnInit(): void {
    
    }

}
