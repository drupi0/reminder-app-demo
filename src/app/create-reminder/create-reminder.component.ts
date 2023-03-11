import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { from } from 'rxjs';

@Component({
  selector: 'app-create-reminder',
  templateUrl: './create-reminder.component.html',
  styleUrls: ['./create-reminder.component.scss'],
})
export class CreateReminderComponent  implements OnInit {

  @Input() reminderObj: {
    id: number,
    name: string,
    time: string
  } = {
    id: 0,
    name: "",
    time: ""
  }

  @Output() onChange: EventEmitter<{
    name: string,
    time: string,
    id: number
  }> = new EventEmitter();

  constructor(private alertController: AlertController) { }

  currentIso = new Date().toISOString();

  ngOnInit() {
    this.getCurrentIsoTime();

    if(Object.values(this.reminderObj).join("").trim().length <= 1) {
      this.resetInput();
    }
  }

  resetInput() {
    this.reminderObj.id = 0;
    this.reminderObj.name = "";
    this.reminderObj.time = this.currentIso;
  }

  getCurrentIsoTime() {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    
    date.setMinutes(date.getMinutes() - offset);

    this.currentIso = date.toISOString();
  }

  setReminder() {
    if(!this.reminderObj.name.trim().length) {
      const alertObs = this.alertController.create({
        header: "Invalid Name",
        message: "Reminder name must not be empty",
        buttons: [
          {
            text: 'Ok',
            role: 'confirm',
          }
        ]
      });

      from(alertObs).subscribe(alertObj => {
        alertObj.present();
      });

      return;
    }

    this.reminderObj.id = new Date().getMilliseconds();

    this.onChange.next(this.reminderObj);

    this.resetInput();
  }
}
