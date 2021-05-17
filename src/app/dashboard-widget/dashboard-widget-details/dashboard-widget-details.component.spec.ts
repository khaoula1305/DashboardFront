import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWidgetDetailsComponent } from './dashboard-widget-details.component';

describe('DashboardWidgetDetailsComponent', () => {
  let component: DashboardWidgetDetailsComponent;
  let fixture: ComponentFixture<DashboardWidgetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardWidgetDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWidgetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
