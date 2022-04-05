import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WayAddComponent } from './way-add.component';

describe('WayAddComponent', () => {
  let component: WayAddComponent;
  let fixture: ComponentFixture<WayAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WayAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WayAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
