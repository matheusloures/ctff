import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private loading: Loading;
  logo_header='../../assets/imgs/logo_header.png';
  navbarColor = 'grey';
  nightmode = 'menu_button_nightmode';


  //signup
  userIn;
  signupForm: FormGroup;
  username;
  email;
  telefone;
  password;
  isReadyToSave;

  constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController,private authP: AuthProvider, private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.createForm();
    this.signupForm.valueChanges.subscribe((v) => {

      if(this.signupForm.valid){
        this.isReadyToSave = true;
      }else{
        this.isReadyToSave = false;

      }

    });
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

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignupPage');
  }

  convertToLower(val, type){
    this.userIn = val.toLowerCase();
  }

  createForm(){
    this.signupForm = this.formBuilder.group({
      username:
        [
          [''],
              Validators.compose(
                [
                  Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(60)

                ]
            )],
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
      telefone:
        [
          [''],
              Validators.compose(
                [
                  Validators.required,
                  Validators.pattern(/^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/),
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

  doSignUp(){
    this.showLoading();
    var nome = this.signupForm.value.username;
    var email = this.signupForm.value.email;
    var tel = this.signupForm.value.telefone;
    var password = this.signupForm.value.password;

    this.authP.signUp(nome, tel, email, password).subscribe(res=>{


      if(res.success===false&&res.payload!=='user_exists'){
        this.authP.log(false);
        this.dismissLoading();
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro, tente novamente.',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }else if(res.payload==='user_exists'){
        this.dismissLoading();
        let toast = this.toastCtrl.create({
          message: 'Email já cadastrado, faça o login ou cadastre-se com outro email.',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }else if(res.success===true&&res.first_sign===true){
        this.navCtrl.pop();
        this.dismissLoading();
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

}
