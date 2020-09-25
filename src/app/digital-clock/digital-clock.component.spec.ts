import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TimeInputComponent } from '../time-input/time-input.component';

import { DigitalClockComponent } from './digital-clock.component';

describe('DigitalClockComponent', () => {
  let component: DigitalClockComponent;
  let fixture: ComponentFixture<DigitalClockComponent>;
  let timeInput: TimeInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalClockComponent, TimeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalClockComponent);
    component = fixture.componentInstance;
    const timeInputQuery = fixture.debugElement.query(By.directive(TimeInputComponent));
    timeInput = timeInputQuery.componentInstance;
    fixture.detectChanges();
  });

  it('should create the digital clock', () => {
    expect(component).toBeTruthy();
  });

  it('should create the time input', () => {
    expect(timeInput).toBeTruthy();
  })

  it('should accept a time 24-hour time input and set the time accordingly in 12-hour time in the DOM', () => {
    component.time = '16:45:30';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const paragraph = compiled.querySelector('p').textContent;
    expect(paragraph).toBe('04:45:30 pm');
  });

  it('should emit an onTimeChange event when the child onTimeChange event is fired', () => {
    spyOn(component.onTimeChange, 'emit');
    timeInput.onTimeChange.emit('12:30:30');
    fixture.detectChanges();
    expect(component.onTimeChange.emit).toHaveBeenCalledWith('12:30:30');
    expect(component.onTimeChange.emit).toHaveBeenCalledTimes(1);
    expect(component.onTimeChange.emit).not.toHaveBeenCalledTimes(2);
  });

});
