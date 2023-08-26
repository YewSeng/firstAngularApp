import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateMeetingComponent } from './admin-create-meeting.component';

describe('AdminCreateMeetingComponent', () => {
  let component: AdminCreateMeetingComponent;
  let fixture: ComponentFixture<AdminCreateMeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateMeetingComponent]
    });
    fixture = TestBed.createComponent(AdminCreateMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
