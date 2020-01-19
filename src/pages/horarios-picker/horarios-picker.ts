import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { OutsideProvider } from '../../providers/outside/outside';

/**
 * Generated class for the HorariosPickerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-horarios-picker',
  templateUrl: 'horarios-picker.html',
})
export class HorariosPickerPage {

  myDate;
  readyToAdd = false;

  constructor(private alertCtrl: AlertController, public viewCtrl: ViewController, private outsideP: OutsideProvider, public navCtrl: NavController, public navParams: NavParams) {
    // console.log(this.myDate);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HorariosPickerPage');
    // console.log('ydate',this.myDate)
  }

  allowSend(date){
    // console.log('ydate',date)
    this.readyToAdd = true;

  }

  addDate(date){
    this.outsideP.showLoading();
    // console.log('date',date);
    var a = this.outsideP.formatDateFromPickerToMoment(date);
    // console.log('formatted', a);
    var b  = this.outsideP.formatDateFromMomentToUnix(a);
    // console.log(b);
    if(date){
      this.outsideP.addNewHorario(b).subscribe(res=>{
        // console.log(res);
        if(res.success===true&&res.message==='class_add_h'){
          this.myDate='';
          let alert = this.alertCtrl.create({
            title: 'Aula computada com sucesso!',
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  // this.confirmWithBackend(data);
                  // console.log('Confirm clicked');
                }
              }
            ]
          });
          alert.present();

        }else if(res.error===true&&res.payload==='horario_exists'){
          let alert = this.alertCtrl.create({
            title: 'Este horário já existe',
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  // this.confirmWithBackend(data);
                  // console.log('Confirm clicked');
                }
              }
            ]
          });
          alert.present();

        }else{

          let alert = this.alertCtrl.create({
            title: 'Houve um erro! Tente novamente mais tarde.',
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  // this.confirmWithBackend(data);
                  // console.log('Confirm clicked');
                }
              }
            ]
          });
          alert.present();
        }
        this.outsideP.dismissLoading();

        // this.viewCtrl.dismiss
      })
    }



  }

}
