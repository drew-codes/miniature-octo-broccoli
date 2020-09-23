import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

enum ClockStyle {
  ANALOG = 'analog',
  DIGITAL = 'digital'
}


@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  @Input() time: string;
  @Input() style: ClockStyle;
  @Output() onTimeChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

}
