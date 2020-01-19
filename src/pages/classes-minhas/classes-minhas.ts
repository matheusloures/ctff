import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OutsideProvider } from '../../providers/outside/outside';
import * as moment from 'moment';
moment.locale('pt-br');

@IonicPage(({
  segment: 'confirmados'
}))
@Component({
  selector: 'page-classes-minhas',
  templateUrl: 'classes-minhas.html',
})
export class ClassesMinhasPage {

  my_classes=[];
  no_classes;
  isAdmin;
  isUser;
  registrados;
  data;
  dividers=[];
  constructor(private alertCtrl: AlertController ,private outsideP: OutsideProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    // console.log('ionViewDidLoad ClassesMinhasPage');
  }

  ionViewWillLoad(){
    if(localStorage.getItem('__user')==='fredtakeshi@gmail.com'||localStorage.getItem('__user')==='louresmat@gmail.com'||localStorage.getItem('__user')==='pedrohenriqueberti@gmail.com'){
      this.isAdmin=true
    }else{
      this.isUser=true;
    }
    this.getMyClasses();
    this.outsideP.showLoading();
  }

  deletaHorario(data,i){
    this.outsideP.showLoading();
    this.outsideP.deleteMyClasses(data).subscribe(res=>{
      if(res.success===true){
        this.outsideP.dismissLoading();
        this.my_classes.splice(i, 1)
      }else{
        this.outsideP.dismissLoading();
        this.no_classes=true;
      }
    })
  }

  cancelarHorario(data, i){
    // var d = moment(data).format('lll');

    let alert = this.alertCtrl.create({
      title: 'Quer mesmo desmarcar presença nesta aula?',
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
            this.deletaHorario(data, i);
          }
        }
      ]
    });
    alert.present();

  }

  getMyClasses(){
    // console.log('alow')

    if(this.isAdmin===true){
      // console.log('isadmin')

      this.outsideP.getAdminClasses().subscribe(res=>{
        // console.log('isadmin', res);
        if(res.success===true){
          this.registrados=res['quantidade'];
          // console.log('regs',this.registrados);
          // console.log('regs',res['registrados']);
          // console.log('regs',res['registrados'][0]);

          // for(let i = 0;i<res['horarios'].length;i++){

            for(let i = 0;i<res['registrados'].length;i++){
              let horario = res['registrados'][i]['horario']
              // console.log('www',res['registrados'][i]['horario'])
              // console.log('www2',horario)
              if(res['registrados'][i]['horario']===horario){

                this.dividers.push({horario: horario, details: res['registrados'][i]});

              }
              // console.log('dividers',this.dividers)


            }

            var unique = this.getUniqueDay(this.dividers).then((res)=>{

              // console.log('resunique',res);
              // console.log('resdivvv', Object.keys(res))
              this.dividers = Object.keys(res);
              // console.log('thisdividers', this.dividers[0])
              // console.log('thisdividers', typeof this.dividers[0])
            })
            // console.log('dividers',this.dividers);
            // console.log('dividers',res['registrados']);
            // this.dividers.sort(function (left, right) {
            //     left=moment(left).format('x');
            //     right=moment(right).format('x');
            //   var a = left-right;
            //   return a;
            // });


          // res['registrados'].sort(function (a, b){
          //       a=moment(a.horario).format('x');
          //       b=moment(b.horario).format('x');
          //   return a-b;
          // });
          this.my_classes=res['registrados'];
        // }
          this.outsideP.dismissLoading();
        }else{
          this.outsideP.dismissLoading();
          this.no_classes=true;
        }
      })
    }
    if(this.isUser){
      // console.log('isuser')
      this.outsideP.getMyClasses().subscribe(res=>{
        // console.log('resMyclasses',res)


        if(res.success===true){
          // for(let i = 0;i<res['horarios'].length;i++){
          this.my_classes = res['horarios'];
        // }
          this.outsideP.dismissLoading();
        }else{
          this.outsideP.dismissLoading();
          this.no_classes=true;
        }
      })
    }


  }

  getUniqueDay(obj){

    return new Promise((resolve,reject)=>{

      var unique = {};
      var distinct = [];
      for( var i in obj ){

       if( typeof(unique[obj[i].horario]) == "undefined"){
        distinct.push(obj[i].horario);
       }
       unique[obj[i].horario] = 0

       resolve(unique);
      }

    })

  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  goToMarcacao(){
    this.navCtrl.push('MarcacaoPage');

  }

  goToCadastrados(){
    this.navCtrl.push('CadastradosPage');

  }

}
