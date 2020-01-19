import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OutsideProvider } from '../../providers/outside/outside';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the CadastradosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrados',
  templateUrl: 'cadastrados.html',
})
export class CadastradosPage {

  cadastrados;
  errorPage;

  constructor(private alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private outsideP: OutsideProvider, public navCtrl: NavController, public navParams: NavParams) {
    if(localStorage.getItem('__user')==='fredtakeshi@gmail.com'||localStorage.getItem('__user')==='louresmat@gmail.com'||localStorage.getItem('__user')==='pedrohenriqueberti@gmail.com'){
      this.getCadastrados();

    }else{
      this.errorPage=true;
    }
    this.outsideP.showLoading();
  }

  presentActionSheet(data){

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções para ' +data.nome.slice(1,-1),
      buttons: [

        {
            text: 'Computar MooveCoins',
            handler: () => {
              // console.log('Compute moovecoins');

              let alert = this.alertCtrl.create({
                title: 'Quantos MooveCoins?',
                inputs: [
                  {
                    name: 'quantity',
                    placeholder: 'Quantidade'
                  }
                ],
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                      // console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'Computar',
                    handler: dados => {
                      // console.log('dsads',data);
                      this.outsideP.computeMooveCoins(data.email, dados.quantity).subscribe(res=>{

                        if(res.success===true&&res.error===false&&res.message==='mc_add_u'){
                          this.outsideP.dismissLoading();
                          let alert = this.alertCtrl.create({
                            title: dados.quantity+' Moove Coins computados com sucesso!',
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

                        // console.log(res);
                      })
                    }
                  }
                ]
              });
              alert.present();
            }
        },
        {
          text: 'Retirar MooveCoins',
          handler: () => {
            // console.log('Compute moovecoins');

            let alert = this.alertCtrl.create({
              title: 'Quantos MooveCoins para retirar?',
              inputs: [
                {
                  name: 'quantity',
                  placeholder: 'Quantidade'
                }
              ],
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  handler: data => {
                    // console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Retirar',
                  handler: dados => {
                    // console.log('dsads',data);
                    this.outsideP.deleteMooveCoins(data.email, dados.quantity).subscribe(res=>{
                      if(res.success===true&&res.error===false&&res.message==='mc_del_us'){
                        this.outsideP.dismissLoading();
                        let alert = this.alertCtrl.create({
                          title: dados.quantity+' Moove Coins retirados com sucesso!',
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
                    })
                  }
                }
              ]
            });
            alert.present();
          }
      },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },

      ]
    });

    actionSheet.present();


  }

  ionViewDidLoad() {

  }

  getCadastrados(){

    this.outsideP.getAdminCadastrados().subscribe(res=>{

      // console.log(res)

      if(res.success===true){
        // for(let i = 0;i<res['horarios'].length;i++){
        this.cadastrados = res['cadastrados'];
      // }
        this.outsideP.dismissLoading();
      }else{
        this.outsideP.dismissLoading();
        this.errorPage
      }
    })

  }

}
