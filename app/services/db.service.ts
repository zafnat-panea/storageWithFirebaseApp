import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private snapshotChangesSubscription: any;

  constructor( public afs: AngularFirestore, public afAuth: AngularFireAuth) { }

  getProductsPublic(){
    return this.afs.collection('users').doc('WGWuiROeK2fPg6FZ7GGHbr1Al6j1').collection('products');
  }

  getProducts(){
    return new Promise<any>((resolve, reject) =>{
      this.afAuth.user.subscribe(currentUser =>{
        if(currentUser){
          this.snapshotChangesSubscription =
          this.afs.collection('users').doc(currentUser.uid).collection('products').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getProduct(productId){
    return new Promise<any>((resolve,reject)=>{
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.doc<any>('users/'+currentUser.uid+'/products/'+
          productId).valueChanges().subscribe(snapshots => {
            resolve(snapshots);
          }, err => {
            reject(err)
          })
        }
      })
    });
  }

  createProduct(value){
    return new Promise<any>((resolve,reject) =>{
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('products').add({
        name: value.name,
        description: value.description,
        image: value.image
      }).then(res => resolve(res),
      err => reject(err))
    })
  }

  updateProduct(productKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('products').doc(productKey)
      .set(value).then(res => resolve(res),
      err => reject(err))
    })
  }

  deleteProduct(productKey){
    return new Promise<any>((resolve, reject) =>{
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('products').doc(productKey)
      .delete().then(res => resolve(res),
      err => reject(err))
    })
  }

  unsubscribeOnLogOut(){
    this.snapshotChangesSubscription.unsubscribe();
  }
}
