import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationTypeComponent } from './visualisation-type.component';

describe('VisualisationTypeComponent', () => {
  let component: VisualisationTypeComponent;
  let fixture: ComponentFixture<VisualisationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualisationTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualisationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
