import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
       //we added overlays so the color can be changed in ios
       if (platform.is('ios')) {
        // This will only print when on iOS
        // console.log('I am an iOS device!');
        localStorage.setItem('__xbr', '==mvmef70');
        this.startingPoint('ios');

      }else if (platform.is('android')){
        // console.log('I am an ANDROID device!');
        this.startingPoint('android');
        localStorage.setItem('__xbr', '==mvmcd60');

      }else if(platform.is('browser')){
        //call session for browser here
        // console.log('I am a browser!');
        localStorage.setItem('__xbr', '==mvmAB50');
      }else{
        localStorage.setItem('__xbr', '==mvmAB50');
        // console.log('I dont know where am I!');

      }
      // splashScreen.hide();
    });
  }
  startingPoint(device){

    this.statusBar.styleDefault();
    //we added overlays so the color can be changed in ios
    if(device==='ios'){
      this.statusBar.overlaysWebView(false)
    }
    //the status bar is being filled with 3dmoove's color.
    this.statusBar.backgroundColorByHexString('#666666');
    //TODO CONFIRM IF THIS IS NEEDED
    this.statusBar.show();
    // this.splashScreen.hide();

  }
}

