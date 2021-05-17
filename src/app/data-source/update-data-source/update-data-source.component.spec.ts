import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDataSourceComponent } from './update-data-source.component';

describe('UpdateDataSourceComponent', () => {
  let component: UpdateDataSourceComponent;
  let fixture: ComponentFixture<UpdateDataSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDataSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
