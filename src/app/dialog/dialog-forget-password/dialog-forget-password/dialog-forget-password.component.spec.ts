import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForgetPasswordComponent } from './dialog-forget-password.component';

describe('DialogForgetPasswordComponent', () => {
  let component: DialogForgetPasswordComponent;
  let fixture: ComponentFixture<DialogForgetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogForgetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
