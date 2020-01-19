import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassesDayPage } from './classes-day';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ClassesDayPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassesDayPage),
    PipesModule
  ],
  exports:[
    ClassesDayPage
  ]
})
export class ClassesDayPageModule {}
