import { TestBed } from '@angular/core/testing';

import { WidgetDashboardService } from './widget-dashboard.service';

describe('WidgetDashboardService', () => {
  let service: WidgetDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
