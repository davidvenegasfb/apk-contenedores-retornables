import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameFormComponent } from './editar.component';

describe('GameFormComponent', () => {
  let component: GameFormComponent;
  let fixture: ComponentFixture<GameFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
