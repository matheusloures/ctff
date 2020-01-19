import { Http, Headers, RequestOptions } from '@angular/http';
import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Loading, LoadingController } from 'ionic-angular';
import * as moment from 'moment';
/*
  Generated class for the OutsideProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OutsideProvider {
  loading:Loading;
  constructor(private loadingCtrl: LoadingController,public http: Http) {
    // console.log('Hello OutsideProvider Provider');
  }

  getDateNow(d){

      return moment.unix(d).format('YYYY-MM-DD'); // 16-01-2018
  }
  formatDateFromPickerToMoment(d){
    var now = moment();
    // console.log()
      return now.format(d) // 2018-08-14T21:00:00-03:00
  }
  formatDateFromMomentToUnix(d){
    var now = moment(d);
    // console.log()
      return now.unix() // 1534291200
  }


  getClasses(){

      const token = localStorage.getItem('__xt');
      // console.log(token);
      var parsedToken = JSON.parse(token);
      var extractedToken = parsedToken.token;
      var extractedMail = parsedToken.email;
      var extractedViewToken = parsedToken.access_token;
    // console.log(extractedToken);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('email', extractedMail);
      headers.append('token', extractedToken);
      headers.append('x-access-token', extractedViewToken);


      let options = new RequestOptions( {method: RequestMethod.Get, headers: headers });
      return this.http.get('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/classes/mvp', options)
      .map(res=>res.json())

  }



  getMyClasses(){

      const token = localStorage.getItem('__xt');
      // console.log(token);
      var parsedToken = JSON.parse(token);
      var extractedToken = parsedToken.token;
      var extractedMail = parsedToken.email;
      var extractedViewToken = parsedToken.access_token;

    // console.log(extractedToken);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', extractedToken);
      headers.append('email', extractedMail);
      headers.append('x-access-token', extractedViewToken);

      let options = new RequestOptions( {method: RequestMethod.Get, headers: headers });
      return this.http.get('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/user/classes', options)
      .map(res=>res.json())

  }
  getMyMoveCoins(){

      const token = localStorage.getItem('__xt');
      // console.log(token);
      var parsedToken = JSON.parse(token);
      var extractedToken = parsedToken.token;
      var extractedMail = parsedToken.email;
      var extractedViewToken = parsedToken.access_token;
      // console.log('email',extractedMail)
    // console.log(extractedToken);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', extractedToken);
      headers.append('x-access-token', extractedViewToken);
      headers.append('email', extractedMail);

      let options = new RequestOptions( {method: RequestMethod.Get, headers: headers });
      return this.http.get('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/user/moovecoins', options)
      .map(res=>res.json())

  }
  getAdminClasses(){

      const token = localStorage.getItem('__xt');
      // console.log(token);
      var parsedToken = JSON.parse(token);
      var extractedToken = parsedToken.token;
      var extractedMail = parsedToken.email;
      var extractedViewToken = parsedToken.access_token;
    // console.log(extractedToken);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', extractedToken);
      headers.append('email', extractedMail);
      headers.append('x-access-token', extractedViewToken);

      let options = new RequestOptions( {method: RequestMethod.Get, headers: headers });
      return this.http.get('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/user/allclasses', options)
      .map(res=>res.json())

  }
  getAdminCadastrados(){

      const token = localStorage.getItem('__xt');
      // console.log(token);
      var parsedToken = JSON.parse(token);
      var extractedToken = parsedToken.token;
      var extractedMail = parsedToken.email;
      var extractedViewToken = parsedToken.access_token;
    // console.log(extractedToken);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', extractedToken);
      headers.append('email', extractedMail);
      headers.append('x-access-token', extractedViewToken);

      let options = new RequestOptions( {method: RequestMethod.Get, headers: headers });
      return this.http.get('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/users', options)
      .map(res=>res.json())

  }
  addNewHorario(unixDate){

      const token = localStorage.getItem('__xt');
      // console.log(token);
      var parsedToken = JSON.parse(token);
      var extractedToken = parsedToken.token;
      var extractedMail = parsedToken.email;
      var extractedViewToken = parsedToken.access_token;
    // console.log(extractedToken);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', extractedToken);
      headers.append('email', extractedMail);
      headers.append('x-access-token', extractedViewToken);

      let obj = {
        horario: unixDate
      }
      let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
      return this.http.post('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/horario/new', obj, options)
      .map(res=>res.json())

  }
  computeMooveCoins(receiver, qty){

      const token = localStorage.getItem('__xt');
      // console.log(token);
      var parsedToken = JSON.parse(token);
      var extractedToken = parsedToken.token;
      var extractedMail = parsedToken.email;
      var extractedViewToken = parsedToken.access_token;
    // console.log(extractedToken);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', extractedToken);
      headers.append('email', extractedMail);
      headers.append('x-access-token', extractedViewToken);

      let obj = {
        receiver: receiver, qty: qty
      }
      let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
      return this.http.post('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/user/moovecoin/add', obj, options)
      .map(res=>res.json())

  }
  deleteMooveCoins(receiver, qty){

      const token = localStorage.getItem('__xt');
      // console.log(token);
      var parsedToken = JSON.parse(token);
      var extractedToken = parsedToken.token;
      var extractedMail = parsedToken.email;
      var extractedViewToken = parsedToken.access_token;
    // console.log(extractedToken);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', extractedToken);
      headers.append('email', extractedMail);
      headers.append('x-access-token', extractedViewToken);

      let obj = {
        receiver: receiver, qty: qty
      }
      let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
      return this.http.post('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/user/moovecoin/delete', obj, options)
      .map(res=>res.json())

  }
  getAdminSemAulas(){

      const token = localStorage.getItem('__xt');
      // console.log(token);
      var parsedToken = JSON.parse(token);
      var extractedToken = parsedToken.token;
      var extractedMail = parsedToken.email;
      var extractedViewToken = parsedToken.access_token;
    // console.log(extractedToken);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', extractedToken);
      headers.append('email', extractedMail);
      headers.append('x-access-token', extractedViewToken);

      let options = new RequestOptions( {method: RequestMethod.Get, headers: headers });
      return this.http.get('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/users/not_assigned', options)
      .map(res=>res.json())

  }

  deleteMyClasses(data){

      const token = localStorage.getItem('__xt');
      // console.log(token);
      var parsedToken = JSON.parse(token);
      var extractedToken = parsedToken.token;
      var extractedAccessToken = parsedToken.access_token;
      var extractedMail = parsedToken.email;
    // console.log(extractedToken);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', extractedToken);
      headers.append('x-access-token', extractedAccessToken);
      headers.append('email', extractedMail);
      headers.append('horario', data);

      let options = new RequestOptions( {method: RequestMethod.Delete, headers: headers });
      return this.http.delete('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/user/class', options)
      .map(res=>res.json())

  }

  assignForClass(data, max, val){
    // console.log('from outside',data);
    const token = localStorage.getItem('__xt');
    var parsedToken = JSON.parse(token);
    var extractedToken = parsedToken.token;
    var extractedAccessToken = parsedToken.access_token;
    var extractedMail = parsedToken.email;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', extractedToken);
    headers.append('x-access-token', extractedAccessToken);
    headers.append('email', extractedMail);

    let obj = {horario: data, val: val, max: max}

    let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
    return this.http.post('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/classes/confirm', obj, options)
    .map(res=>res.json())

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
