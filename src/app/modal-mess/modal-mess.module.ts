import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMessPageRoutingModule } from './modal-mess-routing.module';

import { ModalMessPage } from './modal-mess.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMessPageRoutingModule,ReactiveFormsModule, 
    HttpClientModule
  ],
  declarations: [ModalMessPage]
})
export class ModalMessPageModule {}
