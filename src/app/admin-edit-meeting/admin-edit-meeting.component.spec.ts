import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditMeetingComponent } from './admin-edit-meeting.component';

describe('AdminEditMeetingComponent', () => {
  let component: AdminEditMeetingComponent;
  let fixture: ComponentFixture<AdminEditMeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditMeetingComponent]
    });
    fixture = TestBed.createComponent(AdminEditMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
