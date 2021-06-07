import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Buscar1Component } from './buscar1.component';

describe('Buscar1Component', () => {
  let component: Buscar1Component;
  let fixture: ComponentFixture<Buscar1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Buscar1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Buscar1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
