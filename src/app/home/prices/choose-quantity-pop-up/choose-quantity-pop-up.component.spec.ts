import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseQuantityPopUpComponent } from './choose-quantity-pop-up.component';

describe('ChooseQuantityPopUpComponent', () => {
  let component: ChooseQuantityPopUpComponent;
  let fixture: ComponentFixture<ChooseQuantityPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseQuantityPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseQuantityPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
