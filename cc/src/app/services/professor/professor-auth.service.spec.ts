import { TestBed } from '@angular/core/testing';

import { ProfessorAuthService } from './professor-auth.service';

describe('ProfessorAuthService', () => {
  let service: ProfessorAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessorAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
