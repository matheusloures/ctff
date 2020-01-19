import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastradosPage } from './cadastrados';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CadastradosPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastradosPage),
    PipesModule
  ],
  exports:[
    CadastradosPage
  ]
})
export class CadastradosPageModule {}
