import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryClockComponent } from './primary-clock.component';

describe('PrimaryClockComponent', () => {
  let component: PrimaryClockComponent;
  let fixture: ComponentFixture<PrimaryClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimaryClockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
