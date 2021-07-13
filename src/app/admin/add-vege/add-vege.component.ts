import {ChangeDetectionStrategy, 
        ChangeDetectorRef, 
        Component, 
        ElementRef, 
        OnInit, 
        ViewChild 
       } from '@angular/core';
import { LyDialog } from '@alyle/ui/dialog';
import { ImgCropperEvent } from '@alyle/ui/image-cropper';
import { CropperDialogComponent } from './cropper-dialog/cropper-dialog.component';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin-services/admin.service';
@Component({
  selector: 'install-add-vege',
  templateUrl: './add-vege.component.html',
  styleUrls: ['./add-vege.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddVegeComponent implements OnInit {
  vegForm:FormGroup;
  cropped?:string;
  image:Blob;
  public isLoading:boolean= false;
  userId:string;
  isAdmin:boolean = false;
  @ViewChild('filePicker') fileInput:ElementRef;
    constructor( private _dialog : LyDialog,
                 private _cd : ChangeDetectorRef,
                 private router:Router,
                 private adminService:AdminService,
                 private route: ActivatedRoute) { }
    // selectFile(){
    //   var file = this.fileInput.nativeElement.files[0];
    //   console.log(file);
    //   const fileReader = new FileReader();
    //   fileReader.readAsDataURL(file);
    //   fileReader.addEventListener('load',()=>{
    //     this.imagePreview = fileReader.result;
    //   })
    // }
    openCropperDialog(event: Event) {
      var file = this.fileInput.nativeElement.files[0];
      console.log(file);
      this.cropped = null!;
      this._dialog.open(CropperDialogComponent, {
        data: event,
        width: 320,
        disableClose: true
      }).afterClosed.subscribe((result?: ImgCropperEvent) => {
        if (result) {
          console.log(result);
          this.cropped = result.dataURL;
          this.image = this.dataURLtoBlob(result.dataURL);
          this._cd.markForCheck();
        }
      });
    }
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
  }
  onSubmit(){
    this.isLoading = true;
    // console.log(this.vegForm);
    this.adminService.addPrices(this.vegForm.get('vegetable').value,
    this.vegForm.get('price').value,this.image).then(result =>{
      this.isLoading = false;
      console.log(result);
      console.log(this.isLoading);
    }).catch(error =>{
      this.isLoading = false;
    });
    this.isLoading = false;
  }
  checkString(control:FormControl):{[s:string]:boolean}{
    const exp = /^[A-Za-z]+$/;
    const result = control.value.match(exp) ? true :false;
    if(!result){
      return {IncorrectValue:true};
    }
    return null;
  }
  ngOnInit(): void {
    this.vegForm = new FormGroup({
      'vegetable' : new FormControl('',[Validators.required,Validators.maxLength(20),this.checkString.bind(this)]),
      'price'     : new FormControl('',[Validators.required])
   });
  this.userId = this.route.snapshot.queryParams['id'];
  console.log(this.userId);
  if(this.userId){
    this.adminService.getSingleVegData(this.userId).then((res:any) =>{
      const result = res;
      this.cropped = result.response.imagePath;
      this.vegForm.setValue({vegetable :result.response.vegName,
        price : result.response.price});
      this.isAdmin = true;
    });
  }
  
  } 
}
