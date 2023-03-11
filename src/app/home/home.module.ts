import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CreateReminderComponent } from '../create-reminder/create-reminder.component';
import { ReminderItemComponent } from '../reminder-item/reminder-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage, CreateReminderComponent, ReminderItemComponent]
})
export class HomePageModule {}
