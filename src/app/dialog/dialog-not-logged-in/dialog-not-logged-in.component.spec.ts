import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNotLoggedInComponent } from './dialog-not-logged-in.component';

describe('DialogNotLoggedInComponent', () => {
  let component: DialogNotLoggedInComponent;
  let fixture: ComponentFixture<DialogNotLoggedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNotLoggedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNotLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
