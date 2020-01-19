import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassesMinhasPage } from './classes-minhas';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ClassesMinhasPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassesMinhasPage),
    PipesModule
  ],
  exports:[
    ClassesMinhasPage
  ]
})
export class ClassesMinhasPageModule {}
