import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent implements OnInit {

  constructor() { }

  @Output() onTimeChange = new EventEmitter<string>();
  public hours: string;
  public minutes: string;
  public seconds: string;

  ngOnInit(): void {
  }

  public setTime() {
    const newTime = `${this.hours}:${this.minutes}:${this.seconds}`;
    this.onTimeChange.emit(newTime);
    this.hours = '';
    this.minutes = '';
    this.seconds = '';
  }

}
