import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NannyEditComponent } from './nanny-edit.component';

describe('NannyEditComponent', () => {
  let component: NannyEditComponent;
  let fixture: ComponentFixture<NannyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NannyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NannyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
