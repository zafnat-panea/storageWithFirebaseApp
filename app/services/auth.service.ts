import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {DbService} from './db.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private dbService: DbService,public afAuth: AngularFireAuth) { }
 
  doLogin(value){
    return new Promise<any>((resolve,reject) =>{
      firebase.auth().signInWithEmailAndPassword(value.email,value.password).then(
        res => resolve(res),
        err => reject(err));
    })
  }

  doLogout(){
    return new Promise<void>((resolve,reject) => {
      this.afAuth.auth.signOut().then(() => {
        this.dbService.unsubscribeOnLogOut();
        resolve();
      }).catch((error) => {
        console.log(error);
        reject();
      })
    })
  }

}
