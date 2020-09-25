import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.scss'],
})
export class DigitalClockComponent implements OnInit {
  @Input() set time(timeString: string) {
    const regex = RegExp(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/g);
    const isValidTimeString = regex.test(timeString);

    if (!isValidTimeString) {
      console.error(
        '[DIGITAL CLOCK COMPONENT] Invalid time input. Must be a valid time and format should match HH:mm:ss. Defaulting to system time.'
      );
      this.useSystemTime();
    } else {
      this.useInputTime(timeString);
    }
  }

  @Output() onTimeChange = new EventEmitter<string>();

  
  public currentTime: string;
  private isTimeInit: boolean;
  private timeInterval;
  private incrementedTime: Date;
  
  constructor() {}

  ngOnInit(): void {
    if(!this.isTimeInit) {
      this.useSystemTime();
    }
  }

  private useSystemTime(): void {
    this.updateTime();
    if (this.timeInterval) clearInterval(this.timeInterval);
    this.timeInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
    this.isTimeInit = true;
  }

  private useInputTime(time: string): void {
    let date = new Date();
    let [hours, minutes, seconds] = time.split(':');
    date.setHours(+hours);
    date.setMinutes(+minutes);
    date.setSeconds(+seconds);
    if (this.timeInterval) clearInterval(this.timeInterval);
    this.incrementedTime = date;
    this.updateTime(date);
    if (this.timeInterval) clearInterval(this.timeInterval);
    this.timeInterval = setInterval(() => {
      date = this.incrementTime();
      this.updateTime(date);
    }, 1000);
    this.isTimeInit = true;
  }

  private updateTime(time?: Date): void {
    const date = time || new Date();
    let hours: string | number= date.getHours();
    let minutes: string | number = date.getMinutes();
    let seconds: string | number = date.getSeconds();
    const meridiem = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    const strTime = `${hours}:${minutes}:${seconds} ${meridiem}`;
    this.currentTime = strTime;
    this.isTimeInit = true;
  }

  private incrementTime(): Date {
    const newTime = this.incrementedTime.getTime() + 1000;
    return this.incrementedTime = new Date(newTime);
  }
}
