import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTitlebarComponent } from './game-titlebar.component';

describe('ImgTitlebarComponent', () => {
  let component: GameTitlebarComponent;
  let fixture: ComponentFixture<GameTitlebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTitlebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
