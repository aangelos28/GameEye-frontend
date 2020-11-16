import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPermissionDialogComponent } from './notification-permission-dialog.component';

describe('NotificationPermissionDialogComponent', () => {
  let component: NotificationPermissionDialogComponent;
  let fixture: ComponentFixture<NotificationPermissionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationPermissionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPermissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
