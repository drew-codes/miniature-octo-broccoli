import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnalogClockComponent } from './analog-clock/analog-clock.component';
import { AppComponent } from './app.component';
import { DigitalClockComponent } from './digital-clock/digital-clock.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let analogClock: AnalogClockComponent;
  let digitalClock: DigitalClockComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AnalogClockComponent,
        DigitalClockComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    const analogClockQuery = fixture.debugElement.query(By.directive(AnalogClockComponent));
    const digitalClockQuery = fixture.debugElement.query(By.directive(DigitalClockComponent));
    analogClock = analogClockQuery.componentInstance;
    digitalClock = digitalClockQuery.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render the analog clock', () => {
    expect(analogClock).toBeTruthy();
  });
  
  it('should render the digital clock', () => {
    expect(digitalClock).toBeTruthy();
  });

  it('should update the time if a onTimeChange event is triggered on the child digital clock', () => {
    digitalClock.onTimeChange.emit('12:30:30');
    fixture.detectChanges();
    expect(app.time).toBe('12:30:30');
  });
  
  it('should update the time if a onTimeChange event is triggered on the child analog clock', () => {
    analogClock.onTimeChange.emit('12:30:30');
    fixture.detectChanges();
    expect(app.time).toBe('12:30:30');
  });
});
