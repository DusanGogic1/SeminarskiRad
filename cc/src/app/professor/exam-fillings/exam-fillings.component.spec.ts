import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFillingsComponent } from './exam-fillings.component';

describe('ExamFillingsComponent', () => {
  let component: ExamFillingsComponent;
  let fixture: ComponentFixture<ExamFillingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamFillingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamFillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
