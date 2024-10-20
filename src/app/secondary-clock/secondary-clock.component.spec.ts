import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryClockComponent } from './secondary-clock.component';

describe('SecondaryClockComponent', () => {
  let component: SecondaryClockComponent;
  let fixture: ComponentFixture<SecondaryClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondaryClockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
