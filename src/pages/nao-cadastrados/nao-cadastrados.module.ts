import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NaoCadastradosPage } from './nao-cadastrados';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    NaoCadastradosPage,
  ],
  imports: [
    IonicPageModule.forChild(NaoCadastradosPage),
    PipesModule
  ],
  exports:[
    NaoCadastradosPage
  ]
})
export class NaoCadastradosPageModule {}
