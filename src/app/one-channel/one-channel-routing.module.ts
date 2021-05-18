import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OneChannelPage } from './one-channel.page';

const routes: Routes = [
  {
    path: '',
    component: OneChannelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OneChannelPageRoutingModule {}
