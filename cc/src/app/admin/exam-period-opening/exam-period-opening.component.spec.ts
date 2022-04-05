import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPeriodOpeningComponent } from './exam-period-opening.component';

describe('ExamPeriodOpeningComponent', () => {
  let component: ExamPeriodOpeningComponent;
  let fixture: ComponentFixture<ExamPeriodOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamPeriodOpeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPeriodOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
