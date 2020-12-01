import { TestBed, async, inject } from '@angular/core/testing';

import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtAuthGuard]
    });
  });

  it('should ...', inject([JwtAuthGuard], (guard: JwtAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
