import { Injectable, EventEmitter } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  isAuthenticatedEmitter = new EventEmitter<boolean>();
  isAuthenticated = false
  constructor(
   public afAuth: AngularFireAuth,
   public userService: UserService
  ){}

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        this.isAuthenticatedEmitter.emit(true)
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doTwitterLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        this.isAuthenticatedEmitter.emit(true)
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        this.isAuthenticatedEmitter.emit(true)
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        this.isAuthenticatedEmitter.emit(true)
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        this.isAuthenticatedEmitter.emit(true)
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        this.isAuthenticatedEmitter.emit(false)
        resolve();
      }
      else{
        reject();
      }
    });
  }

  getAuthenticationStatus() {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        this.isAuthenticatedEmitter.emit(true)
        return resolve(true);
      }, err => {
        this.isAuthenticatedEmitter.emit(false)
        return resolve(false);
      })
    })
  }
}
