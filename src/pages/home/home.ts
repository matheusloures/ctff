import { Component } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AuthProvider } from '../../providers/auth/auth';
import { OutsideProvider } from '../../providers/outside/outside';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // @ViewChild(Content) content: Content;

  //nightmode
  logo_header='../../assets/imgs/logo_header_white.png';
  navbarColor = 'grey';
  nightmode = 'menu_button_nightmode';
  dayModeIcon = false;
  nightModeIcon = true;
  isOnPhone;
  button_homescreen = 'home_button';
  text_homescreen = 'home_text';
  logged;
  isAdmin;
  isUser;
  moovecoins;
  pages: any[] = [
    { title: 'Entrar', component: 'LoginPage' }

    // { title: 'QR', component: 'AddDevicePage' },
    // { title: 'Login', component: 'LoginPage' },
    // { title: 'Signup', component: 'SignupPage' },
    // { title: 'Master Detail', component: 'ListMasterPage' },
    // { title: 'Menu', component: 'MenuPage' },
    // { title: 'Settings', component: 'SettingsPage' },
    // { title: 'Search', component: 'SearchPage' }
  ]
  constructor(private outsideP: OutsideProvider, private authP: AuthProvider, private socialSharing: SocialSharing,public navCtrl: NavController) {

  }


  ionViewWillEnter(){



    if(localStorage.getItem('__user')==='fredtakeshi@gmail.com'||localStorage.getItem('__user')==='louresmat@gmail.com'||localStorage.getItem('__user')==='pedrohenriqueberti@gmail.com'){
      this.isAdmin=true
    }else{
      this.isUser=true;
    }

    this.logged = this.authP.logged();
    // console.log('willenter')
    if(this.logged){
      this.outsideP.getMyMoveCoins().subscribe(res=>{
        // console.log('hdbshabdhsa',res);
        this.moovecoins = res.quantity;
      })
    }


  }


  ionViewWillLoad(){


  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
  }

  ionViewDidLoad(){

  }

  ionViewDidEnter(){
    // console.log('entered home');

    var onPhone = localStorage.getItem('__xbr');
    if(onPhone==='==mvmAB50'){
      this.isOnPhone=false;
    }else{
      this.isOnPhone=true;
    }
  }

  goToEventos(){
    this.navCtrl.push('MarcacaoPage');

  }

  logout(){
    this.logged = false;
    this.authP.log(false);
    this.navCtrl.push('LoginPage');
  }

  goToSignup(){
    this.navCtrl.push('LoginPage');

  }

  goToMarcacao(){
    this.navCtrl.push('MarcacaoPage');

  }
  goToMinhasAulas(){
    this.navCtrl.push('ClassesMinhasPage');

  }
  goToCadastrados(){
    this.navCtrl.push('CadastradosPage');

  }
  goToSemAulas(){
    this.navCtrl.push('NaoCadastradosPage');

  }



  toggleNightMode(){
    if(this.logo_header==='../../assets/imgs/logo_header.png'){
      this.logo_header = '../../assets/imgs/logo_header_white.png';
      this.navbarColor='grey';
      this.nightmode='menu_button_nightmode'
      this.dayModeIcon=true;
      this.nightModeIcon=false;
    }else if(this.logo_header === '../../assets/imgs/logo_header_white.png'){
      this.logo_header='../../assets/imgs/logo_header.png';
      this.navbarColor='white';
      this.nightmode='menu_button_daymode'
      this.nightModeIcon=true;
      this.dayModeIcon=false;

    }
  }

  // shareNoWhats(){
  //   this.socialSharing.shareViaWhatsApp('Vamos comigo? É só fazer cadastro no site e marcar presença!', '../../assets/other/post_mvp.jpg', 'http://www.3dmoove.com.br')
  //   .then(() => {
  //     // Success!
  //   }).catch(() => {
  //     // Error!
  //   });

  // }

  marcar(){

    this.navCtrl.push('MarcacaoPage')

  }
  goToLogin(){

    this.navCtrl.push('LoginPage')

  }


  desmarcar(){

    this.navCtrl.push('DesmarcacaoPage')


  }
  goToMooveCoinsTable(){

    this.navCtrl.push('MoovecoinsTablePage')


  }

  nps(){
    this.navCtrl.push('NpsPage')


  }

}
