import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: ProfessorSidebarComponent;
  let fixture: ComponentFixture<ProfessorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
