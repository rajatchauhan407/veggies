import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'install-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  vegData;
  subTotal;
  displayedColumns = ['name','quantity','price','totalprice'];
  constructor(@Inject(MAT_DIALOG_DATA) public passedData:any,
  public dialogRef:MatDialogRef<ConfirmDialogComponent>) { 
    this.vegData = passedData.vegData;
    this.subTotal = passedData.subTotal;
  }

  ngOnInit(): void {
  }

}
