import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCompoComponent } from './check-compo.component';

describe('CheckCompoComponent', () => {
  let component: CheckCompoComponent;
  let fixture: ComponentFixture<CheckCompoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckCompoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
