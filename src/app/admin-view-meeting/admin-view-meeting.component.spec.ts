import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewMeetingComponent } from './admin-view-meeting.component';

describe('AdminViewMeetingComponent', () => {
  let component: AdminViewMeetingComponent;
  let fixture: ComponentFixture<AdminViewMeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewMeetingComponent]
    });
    fixture = TestBed.createComponent(AdminViewMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
