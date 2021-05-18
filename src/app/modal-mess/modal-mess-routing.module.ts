import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMessPage } from './modal-mess.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMessPageRoutingModule {}
