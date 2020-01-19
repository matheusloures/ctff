import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NpsPage } from './nps';

@NgModule({
  declarations: [
    NpsPage,
  ],
  imports: [
    IonicPageModule.forChild(NpsPage),
  ],
  exports:[
    NpsPage
  ]
})
export class NpsPageModule {}
