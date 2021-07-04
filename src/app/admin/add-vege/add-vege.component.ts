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
@Component({
  selector: 'install-add-vege',
  templateUrl: './add-vege.component.html',
  styleUrls: ['./add-vege.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddVegeComponent implements OnInit {
  imagePreview;
  cropped?:string;
  @ViewChild('file') fileInput:ElementRef;
    constructor( private _dialog : LyDialog,
                 private _cd : ChangeDetectorRef) { }
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
      this.cropped = null!;
      this._dialog.open(CropperDialogComponent, {
        data: event,
        width: 320,
        disableClose: true
      }).afterClosed.subscribe((result?: ImgCropperEvent) => {
        if (result) {
          this.cropped = result.dataURL;
          this._cd.markForCheck();
        }
      });
    }
    
  ngOnInit(): void {

  }
   

}
