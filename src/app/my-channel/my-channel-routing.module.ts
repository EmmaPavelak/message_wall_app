import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyChannelPage } from './my-channel.page';

const routes: Routes = [
  {
    path: '',
    component: MyChannelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyChannelPageRoutingModule {}
