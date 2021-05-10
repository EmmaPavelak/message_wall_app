import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyChannelPageRoutingModule } from './my-channel-routing.module';

import { MyChannelPage } from './my-channel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyChannelPageRoutingModule
  ],
  declarations: [MyChannelPage]
})
export class MyChannelPageModule {}
