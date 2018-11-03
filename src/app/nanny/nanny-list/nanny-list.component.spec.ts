import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NannyListComponent } from './nanny-list.component';

describe('NannyListComponent', () => {
  let component: NannyListComponent;
  let fixture: ComponentFixture<NannyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NannyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NannyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
