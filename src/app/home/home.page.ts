import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';
import { from, map } from 'rxjs';
import { AlertController, isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit(): void {
    this.requestPermissions();
    this.getList().subscribe((list: {
      name: string,
      time: string,
      id: number,
    }[]) => {
      this.reminders = list;
    })
  }

  reminders: {
    name: string,
    time: string,
    id: number,
  }[] = [];

  addReminder(reminder: {
    name: string,
    time: string,
    id: number
  }) {

    this.reminders.unshift(JSON.parse(JSON.stringify(reminder)));

    from(LocalNotifications.schedule({
      notifications: [
        {
          title: reminder.name,
          body: reminder.name,
          id: reminder.id,
          schedule: { at: new Date(reminder.time) },
          actionTypeId: "",
          extra: null,

        }
      ]
    })).subscribe(() => {
      this.saveList();
    });
  }

  dismissReminder(reminder: {
    name: string,
    time: string,
    id: number
  }) {
    this.reminders = this.reminders.filter(remItem => remItem.id !== reminder.id);
    this.saveList();
  }

  getPastReminders() {
    return this.reminders.filter(reminder => this.hasPassed(reminder.time));
  }
  
  getUpcomingReminders() {
    return this.reminders.filter(reminder => !this.hasPassed(reminder.time));
  }

  hasPassed(date: string): boolean {
    const reminderDate = new Date(date);
    const currentDate = new Date();
    // currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset());
    return reminderDate <= currentDate;
  }

  private requestPermissions() {
    from(LocalNotifications.requestPermissions()).subscribe(permission => {
      if (permission.display !== 'granted') {
        this.alertNotGranted();
      }
    });
  }


  private alertNotGranted() {
    const alertObs = this.alertController.create({
      header: "Notification Permission Required",
      message: "Notification access must be granted before using this app",
      backdropDismiss: false,
      buttons: [
        {
          text: 'Request Permission',
          role: 'confirm',
          handler: () => this.requestPermissions()
        }
      ]
    });

    from(alertObs).subscribe(alertObj => {
      alertObj.present();
    });
  }

  private saveList() {
    from(Preferences.set({
      key: 'reminderList',
      value: JSON.stringify(this.reminders)
    })).subscribe();
  }

  private getList() {
    return from(Preferences.get({ key: 'reminderList' })).pipe(map(result => result.value ? JSON.parse(result.value) : []));
  }

}
