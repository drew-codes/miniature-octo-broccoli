import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface HandAngles {
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss'],
})
export class AnalogClockComponent implements OnInit {
  @Input() set time(timeString: string) {
    const regex = RegExp(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/g);
    const isValidTimeString = regex.test(timeString);

    if (!isValidTimeString) {
      console.error(
        '[ANALOG CLOCK COMPONENT] Invalid time input. Must be a valid time and format should match HH:mm:ss. Defaulting to system time.'
      );
      this.useSystemTime();
    } else {
      this.useInputTime(timeString);
    }

  }

  @Output() onTimeChange = new EventEmitter<string>();
  constructor() {}

  public clockHands: HandAngles;
  public stopHands: boolean;
  private isTimeInit: boolean;

  ngOnInit(): void {
    if(!this.isTimeInit) {
      this.useSystemTime();
    }
  }

  private useInputTime(time: string): void {
    const [stringHours, stringMinutes, stringSeconds]: Array<string> = time.split(':');
    const hours = parseInt(stringHours);
    const minutes = parseInt(stringMinutes);
    const seconds = parseInt(stringSeconds);
    this.stopHands = true;
    this.clockHands = this.getAnglesFromTime(hours,minutes, seconds);
    setTimeout(() => {
      this.stopHands = false;
    }, 10)
    this.isTimeInit = true;
  }

  private useSystemTime(): void {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    this.stopHands = true;
    this.clockHands = this.getAnglesFromTime(hours, minutes, seconds);
    setTimeout(() => {
      this.stopHands = false;
    }, 10)
    this.isTimeInit = true;
  }

  private getAnglesFromTime(
    hours: number,
    minutes: number,
    seconds: number
  ): HandAngles {
    return {
      hours: (hours * 30) + (minutes / 2),
      minutes: (minutes * 6),
      seconds: (seconds * 6)
    };
  }
}
