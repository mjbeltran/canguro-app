import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NannyCardComponent } from './nanny-card.component';

describe('NannyCardComponent', () => {
  let component: NannyCardComponent;
  let fixture: ComponentFixture<NannyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NannyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NannyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
