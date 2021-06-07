import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Reponerp1Component } from './reponer.component';

describe('Reponerp1Component', () => {
  let component: Reponerp1Component;
  let fixture: ComponentFixture<Reponerp1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Reponerp1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reponerp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
