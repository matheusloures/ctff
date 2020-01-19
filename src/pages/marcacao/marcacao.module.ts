import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarcacaoPage } from './marcacao';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MarcacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(MarcacaoPage),
    PipesModule
  ],
  exports:[
    MarcacaoPage
  ]
})
export class MarcacaoPageModule {}
