import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reminder-item',
  templateUrl: './reminder-item.component.html',
  styleUrls: ['./reminder-item.component.scss'],
})
export class ReminderItemComponent  implements OnInit {

  @Input() name: string = "";
  @Input() time: string = "";
  @Input() id: number = 0;
  @Input() hasPassed: boolean = false;

  @Output() onDismiss: EventEmitter<{name: string, time: string, id: number}> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  dismiss() {
    this.onDismiss.next({ name: this.name, time: this.time, id: this.id});
  }

  toIsoDate(date: string) {
    const toFormatDate = new Date(date);
    // toFormatDate.setMinutes(toFormatDate.getMinutes() + toFormatDate.getTimezoneOffset());

    return `${toFormatDate.toLocaleDateString()} ${toFormatDate.toLocaleTimeString()}`
  }

}
