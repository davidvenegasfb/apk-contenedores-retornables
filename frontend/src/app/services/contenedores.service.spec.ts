import { TestBed } from '@angular/core/testing';

import { ContenedoresService } from './contenedores.service';

describe('ContenedoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContenedoresService = TestBed.get(ContenedoresService);
    expect(service).toBeTruthy();
  });
});
