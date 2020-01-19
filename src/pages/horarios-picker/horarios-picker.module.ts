import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HorariosPickerPage } from './horarios-picker';

@NgModule({
  declarations: [
    HorariosPickerPage,
  ],
  imports: [
    IonicPageModule.forChild(HorariosPickerPage),
  ],
  exports:[
    HorariosPickerPage
  ]
})
export class HorariosPickerPageModule {}
