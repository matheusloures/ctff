import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoovecoinsTablePage } from './moovecoins-table';

@NgModule({
  declarations: [
    MoovecoinsTablePage,
  ],
  imports: [
    IonicPageModule.forChild(MoovecoinsTablePage),
  ],
  exports:[
    MoovecoinsTablePage
  ]
})
export class MoovecoinsTablePageModule {}
