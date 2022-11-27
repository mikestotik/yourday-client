import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { TimeFormat } from './clock.enum';


@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: [ './clock.component.scss' ]
})
export class ClockComponent implements OnInit {

  @ViewChild('hour', { static: true })
  public hourRef!: ElementRef;

  @ViewChild('min', { static: true })
  public minRef!: ElementRef;

  @ViewChild('second', { static: true })
  public secondRef!: ElementRef;

  @Input()
  public date!: Date | string | null;

  @Output()
  public selected!: EventEmitter<Date | null>;

  @Output()
  public hour!: EventEmitter<number>;

  @Output()
  public minutes!: EventEmitter<number>;

  public sectors: number[] = [];
  public timeFormat = TimeFormat;

  public selectedHour!: number | null;
  public selectedMins!: number | null;
  public selectedFormat!: TimeFormat | null;

  public atHour!: string | null;
  public atMin!: string | null;

  constructor() {
    this.selected = new EventEmitter<Date | null>();
    this.hour = new EventEmitter<number>();
    this.minutes = new EventEmitter<number>();
    this.renderSectors();
  }

  public ngOnInit(): void {
    this.date = this.date ? new Date(this.date) : new Date();
    this.selectedFormat = moment(this.date).format('A') as TimeFormat;

    this.renderClock(this.date);
  }

  public onSelect(value: number): void {
    if (typeof this.date === 'string') {
      this.date = new Date(this.date);
    }

    this.selectedFormat = null;

    if (this.selectedHour && !this.selectedMins) {
      this.date?.setMinutes(value);

      this.date = new Date(this.date!);
      this.renderClock(new Date(this.date!));

      this.selectedMins = value;
      this.minutes.emit(value);
    }

    if (!this.selectedHour && !this.selectedMins) {
      const hour = Math.round(value / 5);
      this.date?.setHours(hour);

      this.date = new Date(this.date!);
      this.renderClock(this.date);

      this.selectedHour = value;
      this.hour.emit(hour);
    }
  }

  // TODO: 1. select FORMAT -> 2. select HOUR -> 3. select MINUTES
  public onSelectFormat(format: TimeFormat): void {
    this.selectedFormat = format;

    const dt = moment(
      `${ this.selectedHour! / 5 }:${ this.selectedMins } ${ format }`, [ 'h:mm A' ]
    ).format('HH:mm');

    const date = new Date(this.date!);
    const hour = Number(dt.split(':')[0]);
    const mins = Number(dt.split(':')[1]);
    date.setHours(hour, mins, 0, 0);

    this.selected.emit(date);

    this.selectedHour = null;
    this.selectedMins = null;
  }

  public onEnter(value: number): void {
    const hour = Math.round(value / 5);
    if (!this.selectedMins && !this.selectedHour) {
      this.atHour = hour <= 9 ? `0${ hour }` : `${ hour }`;
    }

    if (!this.selectedMins && this.selectedHour) {
      this.atMin = value <= 9 ? `0${ value }` : `${ value }`;
    }
  }

  public onLeave(): void {
    this.atHour = null;
    this.atMin = null;
  }

  private setSecond(seconds: number): void {
    const secondHand = this.secondRef.nativeElement;
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${ secondsDegrees }deg)`;
  }

  private setMinutes(minutes: number, seconds: number): void {
    const minsHand = this.minRef.nativeElement;
    const minsDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    minsHand.style.transform = `rotate(${ minsDegrees }deg)`;
  }

  private setHour(hour: number, minutes: number): void {
    const hourHand = this.hourRef.nativeElement;
    const hourDegrees = ((hour / 12) * 360) + ((minutes / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${ hourDegrees }deg)`;
  }

  private renderClock(date: Date): void {
    this.setSecond(date.getSeconds());
    this.setMinutes(date.getMinutes(), date.getSeconds());
    this.setHour(date.getHours(), date.getMinutes());
  }

  private renderSectors(): void {
    for (let i = 0; i < 60; i++) {
      this.sectors.push(i);
    }
  }
}
