import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[installHightlight]',
  })
export class HightlightDirective implements OnInit{
 @Input() installHighLight='';
  constructor(private elRef:ElementRef, private renderer:Renderer2) { }
  ngOnInit(){
    // this.renderer.setStyle(this.elRef.nativeElement,'background-color','green');
    // this.renderer.setStyle(this.elRef.nativeElement,'border-radius','2px');
    // this.renderer.setStyle(this.elRef.nativeElement,'padding','5px');
    // this.renderer.setStyle(this.elRef.nativeElement,'box-sizing','border-box');
    this.renderer.setAttribute(this.elRef.nativeElement,'class','directiveClass');
    this.renderer.setProperty(this.elRef.nativeElement,'admin','true');
  }
}
