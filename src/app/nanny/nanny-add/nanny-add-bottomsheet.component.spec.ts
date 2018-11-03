import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NannyAddBottomsheetComponent } from './nanny-add-bottomsheet.component';

describe('NannyAddBottomsheetComponent', () => {
  let component: NannyAddBottomsheetComponent;
  let fixture: ComponentFixture<NannyAddBottomsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NannyAddBottomsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NannyAddBottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
