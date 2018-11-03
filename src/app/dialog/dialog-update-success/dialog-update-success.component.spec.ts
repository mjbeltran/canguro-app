import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateSuccessComponent } from './dialog-update-success.component';

describe('DialogUpdateSuccessComponent', () => {
  let component: DialogUpdateSuccessComponent;
  let fixture: ComponentFixture<DialogUpdateSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUpdateSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
