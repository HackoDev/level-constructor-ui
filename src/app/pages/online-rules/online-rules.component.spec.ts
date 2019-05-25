import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineRulesComponent } from './online-rules.component';

describe('OnlineRulesComponent', () => {
  let component: OnlineRulesComponent;
  let fixture: ComponentFixture<OnlineRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
