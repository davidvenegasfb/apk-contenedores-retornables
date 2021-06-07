import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Buscar2Component } from './buscar2.component';

describe('Buscar2Component', () => {
  let component: Buscar2Component;
  let fixture: ComponentFixture<Buscar2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Buscar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Buscar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
