import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureRestComponent } from './configure-rest.component';

describe('ConfigureRestComponent', () => {
  let component: ConfigureRestComponent;
  let fixture: ComponentFixture<ConfigureRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureRestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
