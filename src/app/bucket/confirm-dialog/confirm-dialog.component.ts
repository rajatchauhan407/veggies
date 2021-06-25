import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { VegDataService } from 'src/app/shared/services/vegData.service';

@Component({
  selector: 'install-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  universityData;
  userId
  vegData;
  subTotal;
  displayedColumns = ['name','quantity','price','totalprice'];
  dataSource;
  constructor(@Inject(MAT_DIALOG_DATA) public passedData:any,
  public dialogRef:MatDialogRef<ConfirmDialogComponent>,
  private vegDataService:VegDataService) { 
    this.dataSource = new MatTableDataSource(passedData.vegData);
    this.vegData = passedData.vegData;
    this.subTotal = passedData.subTotal;
    this.userId = passedData.userId;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  confirmOrder(){
    this.vegDataService.orderConfirmed(this.vegData,this.subTotal,this.userId);
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
