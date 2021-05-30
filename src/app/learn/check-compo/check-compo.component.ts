import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'install-check-compo',
  templateUrl: './check-compo.component.html',
  styleUrls: ['./check-compo.component.css']
})
export class CheckCompoComponent implements OnInit {
  toppings:Array<any>=[{name:'pepper',value:'pepper'},
{name:'turmeric', value:'turmeric'},
{name:'redchilli', value:'redchilli'}];
  constructor() { }
  date=new FormControl(new Date());
  checkForm:FormGroup;
  ngOnInit(): void {
    let date= new Date();
    console.log(date);
    console.log(date)
    console.log(date.getFullYear() +'   '+ date.getHours() +' : ' + date.getMinutes());
    this.checkForm=new FormGroup({
      'top':new FormArray([])
    })
  }
  onSubmit(){

    // (<FormArray>this.checkForm.get('top')).push(new FormControl())
    console.log(this.checkForm.get('top').value);
  }
  onCheck(e){
    // console.log(e);
    if(e.checked){
      (<FormArray>this.checkForm.get('top')).push(new FormControl(e.source.value));
    }else{
      let i=0;
      (<FormArray>this.checkForm.get('top')).controls.forEach((ctrl:FormControl)=>{
          if(ctrl.value==e.source.value){
            (<FormArray>this.checkForm.get('top')).removeAt(i);
          }
          i++;
      })
    }
  
  }
}
