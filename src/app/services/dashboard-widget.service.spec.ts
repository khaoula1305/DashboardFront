import { TestBed } from '@angular/core/testing';

import { DashboardWidgetService} from './dashboard-widget.service';

describe('WidgetDashboardService', () => {
  let service: DashboardWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
