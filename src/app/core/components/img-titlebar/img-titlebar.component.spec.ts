import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgTitlebarComponent } from './img-titlebar.component';

describe('ImgTitlebarComponent', () => {
  let component: ImgTitlebarComponent;
  let fixture: ComponentFixture<ImgTitlebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgTitlebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgTitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
