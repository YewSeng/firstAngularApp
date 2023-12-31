import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientsComponent } from './view-clients.component';

describe('ViewClientsComponent', () => {
  let component: ViewClientsComponent;
  let fixture: ComponentFixture<ViewClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewClientsComponent]
    });
    fixture = TestBed.createComponent(ViewClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
