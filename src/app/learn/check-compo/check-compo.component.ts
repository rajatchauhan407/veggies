import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth-services';

@Component({
  selector: 'install-check-compo',
  templateUrl: './check-compo.component.html',
  styleUrls: ['./check-compo.component.css']
})
export class CheckCompoComponent implements OnInit {
  toppings:Array<any>=[{name:'pepper',value:'pepper'},
{name:'turmeric', value:'turmeric'},
{name:'redchilli', value:'redchilli'}];
userId;
  constructor(private authService:AuthService) { 
  }
  date=new FormControl(new Date());
  checkForm:FormGroup;
  ngOnInit(): void {
    let date= new Date();
    // console.log(date);
    // console.log(date)
    // console.log(date.getFullYear() +'   '+ date.getHours() +' : ' + date.getMinutes());
    this.checkForm=new FormGroup({
      'top':new FormArray([])
    });
   
  }
  getUserId(){
    return this.userId;
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
  setTimer(duration){
    const promise= new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('Done!')
      },2000);
    });
    return promise;
  }
  getPosition(){
    const promise = new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(success=>{
        resolve(success);
      }, error=>{
        reject(error);
      })
    });
    return promise;
  }
  async getLocation(){ 
    Promise.all([this.getPosition(),this.setTimer(1000)]).then(result=>{
      console.log(result );
    }).catch(error=>{
      console.log(error);
    });
    // let positionData;
    // let setTimer;
    // try{
    //   positionData=  await this.getPosition();
    // setTimer= await this.setTimer(2000);
    // }catch(error){
    //   console.log(error);
    }
    
    // console.log(positionData,setTimer);
      // this.getPosition().then(
      //   (posData)=>{
      //     positionData=posData;
      //     return this.setTimer(2000);
      //   }
      // )
      // .then((data)=>{
      //   console.log(data);
      // }).catch(
      //   err=>{
      //     console.log(err);
      //     return err;
      //   }
      // );
  }
