import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent implements OnInit {

  constructor() { }

  public hours: string;
  public minutes: string;
  public seconds: string;

  ngOnInit(): void {
  }

  public setTime() {

  }

}
