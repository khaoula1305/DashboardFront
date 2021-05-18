import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWidgetComponent } from './update-widget.component';

describe('UpdateWidgetComponent', () => {
  let component: UpdateWidgetComponent;
  let fixture: ComponentFixture<UpdateWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
