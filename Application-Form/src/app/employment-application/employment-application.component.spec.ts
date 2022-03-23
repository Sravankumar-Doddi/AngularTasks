import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentApplicationComponent } from './employment-application.component';

describe('EmploymentApplicationComponent', () => {
  let component: EmploymentApplicationComponent;
  let fixture: ComponentFixture<EmploymentApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
