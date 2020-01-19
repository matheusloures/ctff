import { Http, Headers, RequestOptions } from '@angular/http';
import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
@Injectable()
export class AuthProvider {

  constructor(public http: Http) {
    // console.log('Hello AuthProvider Provider');
  }

  log(is){
    if(is===true){
      localStorage.setItem('__xl', 'true');
    }else{
      localStorage.removeItem('__user');
      localStorage.removeItem('__xl');
      localStorage.removeItem('__xt');
    }

  }

  tokenize(it){

      localStorage.setItem('__xt', JSON.stringify(it));


  }

  storeEmail(email){
    localStorage.setItem('__user', email)
  }

  tokenize2(it){

    localStorage.setItem('__xtv', JSON.stringify(it));


}

  logged(){
    var a = localStorage.getItem('__xl');

      if(a==='true'){
        return true;
      }else{
        return false;
      }

  }

  logIn(email, password){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
    var obj = {email: email, password: password}
    return this.http.post('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/user/login', obj, options)
    .map(res=>res.json())


  }

  signUp(nome, tel, email, password){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
    var obj = {name: nome, tel: tel, email: email, password: password}
    return this.http.post('http://ec2-18-218-7-226.us-east-2.compute.amazonaws.com:5000/user/new', obj, options)
    .map(res=>res.json())

  }

}
