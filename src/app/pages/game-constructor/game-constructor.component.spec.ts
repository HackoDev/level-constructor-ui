import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConstructorComponent } from './game-constructor.component';

describe('GameConstructorComponent', () => {
  let component: GameConstructorComponent;
  let fixture: ComponentFixture<GameConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameConstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
