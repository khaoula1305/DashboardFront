import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEditionComponent } from './dashboard-edition.component';

describe('DashboardEditionComponent', () => {
  let component: DashboardEditionComponent;
  let fixture: ComponentFixture<DashboardEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
