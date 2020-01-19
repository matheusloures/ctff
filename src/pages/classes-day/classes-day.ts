import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { OutsideProvider } from '../../providers/outside/outside';
import { AuthProvider } from '../../providers/auth/auth';
moment.locale('pt-br');


@IonicPage({
  segment: 'horarios'
})
@Component({
  selector: 'page-classes-day',
  templateUrl: 'classes-day.html'
})
export class ClassesDayPage {
  loading: Loading;
  objectKeys = Object.keys;
  horarios;
  date;
  day;
  classes = localStorage.getItem('classes');
  mClasses = JSON.parse(this.classes);
  constructor(private authP: AuthProvider, public loadingCtrl: LoadingController,private toastCtrl: ToastController,public outsideP:OutsideProvider, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    // this.day = this.navParams.get('day')
    // this.horarios= this.day[0]['aulas'];
    this.day= this.navParams.get('date');
    var day=this.day;
    // console.log(this.day)
    // console.log(day);
    // console.log('mclasses',this.mClasses)
    var uniqueArr = this.mClasses.filter(function (el) {
      // console.log('el',el)
      // console.log('el2,',el.horario)
      // console.log('el3,',this.date)
      let dateMoove = outsideP.getDateNow(el.horario);
      // console.log('datemoove',dateMoove)
      return dateMoove === day
    });
    this.date = uniqueArr
    // console.log('thisdate',this.date)
  }

  comoFuncionaMc(){

    this.navCtrl.push('MoovecoinsTablePage');

  }

  ionViewWillEnter(){

  }



  confirmHorario(data, max, val){
    var d = moment.unix(data).format('lll');
    var loggedIn = this.authP.logged();
    if(loggedIn){
      let alert = this.alertCtrl.create({
        title: 'Confirma sua presença no dia '+d+'?',
        message: 'Seus Moove Coins só serão debitados 15 minutos antes da aula.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Confirmar',
            handler: () => {
              this.confirmWithBackend(data, max, val);
            }
          }
        ]
      });
      alert.present();
    }else{
      let alert = this.alertCtrl.create({
        title: 'Você precisa fazer Login',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Fazer Login',
            handler: () => {
             this.navCtrl.push('LoginPage', {from: 'classes-day', date: data, day:this.day})
            }
          }
        ]
      });
      alert.present();
    }



  }

  confirmWithBackend(data, max, val){
    this.outsideP.showLoading();
    // console.log('inside backend')
    this.outsideP.assignForClass(data, max, val).subscribe(res=>{
    // console.log('inside backend 2')
      // console.log('response backend',res);
      // console.log('backend',res);
      if(res.success===true&&res.error===false&&res.message==='Confirmed'){
        this.outsideP.dismissLoading();
        let alert = this.alertCtrl.create({
          title: 'Presença confirmada com sucesso!',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.navCtrl.pop();
                // this.confirmWithBackend(data);
                // console.log('Confirm clicked');
              }
            }
          ]
        });
        alert.present();
      }else if(res.success===false&&res.error===true&&res.payload==='conf_class_stud_dup'){
        this.outsideP.dismissLoading();
        // console.log('inside backend 3')
        let alert = this.alertCtrl.create({
          title: 'Você já se inscreveu nesta aula.',
          message:  'Que tal outro horário?',
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

      }else if(res.success===true&&res.payload==='full'){
        this.outsideP.dismissLoading();
        // console.log('inside backend 3')
        let alert = this.alertCtrl.create({
          title: 'Esta aula está lotada.',
          message:  'Que tal outro horário?',
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

      }else if(res.success===true&&res.error===true&&res.message==='user_good_wrong'){
        let alert = this.alertCtrl.create({
          title: 'Faça login como um usuário.',
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
          title: 'Houve um problema, tente novamente mais tarde!',
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
    },err=>{
      this.outsideP.dismissLoading();
      let toast = this.toastCtrl.create({
        message: 'Houve um erro, tente novamente.',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    },()=>{
      this.outsideP.dismissLoading();

    })

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ClassesDayPage');
  }



}
