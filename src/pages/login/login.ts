import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  logo_header='../../assets/imgs/logo_header.png';
  navbarColor = 'grey';
  nightmode = 'menu_button_nightmode';

  loginForm: FormGroup;
  isReadyToSave;

  loading: Loading;
  userRole;
  adminRole;

  constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController, private authP: AuthProvider, private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.createForm();
    this.loginForm.valueChanges.subscribe((v) => {

      if(this.loginForm.valid){
        this.isReadyToSave = true;
      }else{
        this.isReadyToSave = false;

      }

    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }

  createForm(){
    this.loginForm = this.formBuilder.group({
      email:
        [
          [''],
              Validators.compose(
                [
                  Validators.required,
                  Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                  Validators.minLength(5),
                  Validators.maxLength(40)
                ]
              )],
      password:
        [
          [''],
                Validators.compose(
                  [
                    Validators.required,
                    Validators.pattern(/^(?=.*\d).{7,20}$/),
                    Validators.minLength(8),
                    Validators.maxLength(20),
                  ]
                )]

    });

  }

  goToSignup(){
    this.navCtrl.push('SignupPage');

  }

  doLogin(){

    this.showLoading();

    var email = this.loginForm.value.email;
    var password = this.loginForm.value.password;

    this.authP.logIn(email, password).subscribe(res=>{
      if(res.success===false){
        this.authP.log(false);
        this.dismissLoading();
        let toast = this.toastCtrl.create({
          message: 'Credenciais inválidas, tente novamente.',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }else{
        this.dismissLoading();
        this.authP.log(true);
        this.authP.storeEmail(email);
        this.authP.tokenize(res);
        this.navCtrl.pop();
        var from = this.navParams.get('from')
        var date = this.navParams.get('date')
        var day = this.navParams.get('day')
        // if(from&&date&&day){
        //   this.navCtrl.pop();
        // }else{
        //   this.navCtrl.push('HomePage');
        // }
      }
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

    })
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
