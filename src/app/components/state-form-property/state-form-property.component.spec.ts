import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateFormPropertyComponent } from './state-form-property.component';

describe('StateFormPropertyComponent', () => {
  let component: StateFormPropertyComponent;
  let fixture: ComponentFixture<StateFormPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateFormPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateFormPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
