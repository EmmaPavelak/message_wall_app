import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OneChannelPageRoutingModule } from './one-channel-routing.module';

import { OneChannelPage } from './one-channel.page';
import { HttpClientModule } from '@angular/common/http';
import { AddMessageComponent } from '../add-message/add-message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OneChannelPageRoutingModule,ReactiveFormsModule, 
    HttpClientModule
  ],
  declarations: [OneChannelPage,AddMessageComponent]
})
export class OneChannelPageModule {}
