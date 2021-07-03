import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVegeComponent } from './add-vege.component';

describe('AddVegeComponent', () => {
  let component: AddVegeComponent;
  let fixture: ComponentFixture<AddVegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
