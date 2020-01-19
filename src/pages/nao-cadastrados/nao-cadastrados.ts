import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OutsideProvider } from '../../providers/outside/outside';

@IonicPage()
@Component({
  selector: 'page-nao-cadastrados',
  templateUrl: 'nao-cadastrados.html',
})
export class NaoCadastradosPage {

  cadastrados;
  errorPage;

  constructor(private outsideP: OutsideProvider, public navCtrl: NavController, public navParams: NavParams) {
    if(localStorage.getItem('__user')==='fredtakeshi@gmail.com'||localStorage.getItem('__user')==='louresmat@gmail.com'||localStorage.getItem('__user')==='pedrohenriqueberti@gmail.com'){
      this.getSemAulas();

    }else{
      this.errorPage=true;
    }
    this.outsideP.showLoading();
  }

  ionViewDidLoad() {

  }

  getSemAulas(){

    this.outsideP.getAdminSemAulas().subscribe(res=>{

      // console.log(res)

      if(res.success===true){
        // for(let i = 0;i<res['horarios'].length;i++){
        this.cadastrados = res['registrados'];
      // }
        this.outsideP.dismissLoading();
      }else{
        this.outsideP.dismissLoading();
        this.errorPage
      }
    })

  }

}
