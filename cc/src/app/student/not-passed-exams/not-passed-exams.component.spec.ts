import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPassedExamsComponent } from './not-passed-exams.component';

describe('NotPassedExamsComponent', () => {
  let component: NotPassedExamsComponent;
  let fixture: ComponentFixture<NotPassedExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotPassedExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotPassedExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
