import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerReposicionComponent } from './ver-reposicion.component';

describe('VerReposicionComponent', () => {
  let component: VerReposicionComponent;
  let fixture: ComponentFixture<VerReposicionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerReposicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerReposicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
