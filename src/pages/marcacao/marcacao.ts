import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController, ToastController, PopoverController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OutsideProvider } from '../../providers/outside/outside';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the MarcacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(({
  segment: 'datas'
}))
@Component({
  selector: 'page-marcacao',
  templateUrl: 'marcacao.html',
})
export class MarcacaoPage {
  loading: Loading;
  objectKeys = Object.keys;
  private todo : FormGroup;
  academias;
  dia;
  day;
  month;
  year;
  today;

  datas = [];
  horarios = [];

  logged;
  isAdmin;
  isUser;

  constructor(public popoverCtrl: PopoverController,private authP: AuthProvider, private toastCtrl: ToastController ,public loadingCtrl: LoadingController,private outsideP: OutsideProvider, private alertCtrl: AlertController,private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.listClasses();

  }

  presentPopover() {
    let popover = this.popoverCtrl.create('HorariosPickerPage');
    popover.present();
  }

  goToHorarios(){
    this.navCtrl.push('MarcacaoPage')
  }

  enviarMarcacao(){
    // presentAlert() {
      let alert = this.alertCtrl.create({
        title: 'Marcação confirmada',
        subTitle: 'Estamos te aguardando!',
        buttons: ['Ok']
      });
      alert.present();
    // }
  }

  logForm(){
    // console.log(this.todo.value)
  }

  goToDay(date){
    // console.log(date);
    // this.horarios.find(x=>{x})
    // myArray.find(x => x.id === '45').foo;
    this.navCtrl.push('ClassesDayPage', {
      date: date
    })
    // console.log('day',this.horarios[date])
    // console.log('day',this.horarios[date][0])
  }

  ionViewCanEnter(){
    var a = this.authP.logged();
    if(a===true){
      return true;
    }else{
      return false;
    }
  }

  ionViewWillEnter(){
    if(localStorage.getItem('__user')==='fredtakeshi@gmail.com'||localStorage.getItem('__user')==='louresmat@gmail.com'||localStorage.getItem('__user')==='pedrohenriqueberti@gmail.com'){
      this.isAdmin=true
    }else{
      this.isUser=true;
    }

    this.logged = this.authP.logged();
    // console.log('willenter')

  }

  //TODO


  listClasses(){
    this.showLoading();

    var classes = localStorage.getItem('classes');
    var lotado = localStorage.getItem('full')
    if(classes&&lotado==='12'){
      this.dismissLoading();

      this.datas = JSON.parse(classes);
      this.horarios = JSON.parse(classes);
    }else{
      var arrayOfDateNow = [];
      this.outsideP.getClasses().subscribe(res=>{
        // console.log('ressss',res)
        if(res.exists!==false){

        // console.log('reshorario',res['horarios'][1]['horario'])
        for(let i=0;i<Object.keys(res['horarios']).length;i++){
          let unix=res['horarios'][i]['horario'];
          let date = this.outsideP.getDateNow(unix)
          // console.log('date',date)
          arrayOfDateNow.push(date);
        }

        // console.log(arrayOfDateNow);
        var a  = this.getUniqueDay(arrayOfDateNow).then((res)=>{

          // console.log('aaa',res[0])
          // console.log('bbb',Object.keys(res))
          this.datas = Object.keys(res);
          // console.log('ccc',this.datas)

        });
        // a.then(res=>{
        //   console.log('bbb', res)
        // })

        localStorage.setItem('classes', JSON.stringify(res['horarios']));
        localStorage.setItem('full', '11');
        // this.horarios.push(res['classes'][0]);
        // this.datas = res['horarios'];
        // this.horarios = res['horarios'];
        // console.log(res['classes']);
        // console.log('objkey',this.objectKeys(this.datas));
        // this.datas.push(res['classes']);

        // console.log(' res 2', this.horarios[0]);
        // console.log(' res 3', this.datas);

        }
        this.dismissLoading();

      },err=>{
        this.dismissLoading();
        let toast = this.toastCtrl.create({
          message: 'Houve um erro, tente novamente.',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      },()=>{
        this.dismissLoading();

      });
    }

  }

  getUniqueDay(obj){

    return new Promise((resolve,reject)=>{

      var unique = {};
      var distinct = [];
      for( var i in obj ){

       if( typeof(unique[obj[i]]) == "undefined"){
        distinct.push(obj[i]);
       }
       unique[obj[i]] = 0

       resolve(unique);
      }

    })

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MarcacaoPage');
  }

  showLoading(content?, priority?, id?) {
    // console.log('showing loading id'+id)

    if(!content){
      if(!this.loading){
        this.loading = this.loadingCtrl.create({
            content: 'Aguarde ...'
        });
        this.loading.present();
      }
    }else{
      if(!this.loading){
        this.loading = this.loadingCtrl.create({
            content: content
        });
        this.loading.present();
      }
    }


    }

    dismissLoading(priority?, id?){

        if(this.loading){
            this.loading.dismiss();
            this.loading = null;
        }else{
          this.loading = null;

        }
    }

}
