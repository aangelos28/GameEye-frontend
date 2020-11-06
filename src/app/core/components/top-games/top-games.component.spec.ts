import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopGamesComponent } from './top-games.component';

describe('TopGamesComponent', () => {
  let component: TopGamesComponent;
  let fixture: ComponentFixture<TopGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
