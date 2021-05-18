import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetEditionComponent } from './widget-edition.component';

describe('WidgetEditionComponent', () => {
  let component: WidgetEditionComponent;
  let fixture: ComponentFixture<WidgetEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
