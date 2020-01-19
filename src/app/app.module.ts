import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DesmarcacaoPage } from '../pages/desmarcacao/desmarcacao';
import { NpsPage } from '../pages/nps/nps';
import { MarcacaoPage } from '../pages/marcacao/marcacao';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AuthProvider } from '../providers/auth/auth';
import { HttpModule } from '@angular/http';
import { LocationStrategy,
  PathLocationStrategy } from '@angular/common';
import { OutsideProvider } from '../providers/outside/outside';
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // {
    //   provide: LocationStrategy,
    //   useClass: PathLocationStrategy
    // },
    SocialSharing,
    AuthProvider,
    OutsideProvider
  ]
})
export class AppModule {}
