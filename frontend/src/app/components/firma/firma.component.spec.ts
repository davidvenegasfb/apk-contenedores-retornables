import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FirmaComponent } from './firma.component';

describe('FirmaComponent', () => {
  let component: FirmaComponent;
  let fixture: ComponentFixture<FirmaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
