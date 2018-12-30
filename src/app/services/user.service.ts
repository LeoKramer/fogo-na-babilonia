import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from '../models/firebase.user.model';

@Injectable()
export class UserService {

  userImage: String;
  userName: String;
  userUID: String;

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth
  ){ }


  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('Nenhum usuário logado!');
        }
      })
    })
  }

  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }

  setUser(user: FirebaseUserModel) {
    this.userImage = user.image;
    this.userName = user.name;
    this.userUID = user.uid;
  }

  getUserName() : String {
    return this.userName;
  }

  getUserImage() : String {
    return this.userImage;
  }

  getUserUID() : String {
    return this.userUID;
  }
}
