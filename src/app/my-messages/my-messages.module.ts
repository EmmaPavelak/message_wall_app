import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyMessagesPageRoutingModule } from './my-messages-routing.module';

import { MyMessagesPage } from './my-messages.page';
import { AddMessageComponent } from '../add-message/add-message.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyMessagesPageRoutingModule,
  ],
  declarations: [MyMessagesPage,AddMessageComponent]
})
export class MyMessagesPageModule {}
