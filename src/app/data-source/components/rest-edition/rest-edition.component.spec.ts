import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestEditionComponent } from './rest-edition.component';

describe('RestEditionComponent', () => {
  let component: RestEditionComponent;
  let fixture: ComponentFixture<RestEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
