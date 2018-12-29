import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from '../models/user.model';
import { UserService } from './user.service';
import { CardsService } from './cards.services';

@Injectable()
export class MatchService {

    matchID: String;

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth,
   public userService: UserService,
   public cardsService: CardsService
  ){ }

  createMatch() {
    console.log(this.cardsService.getAnswerCards())

    var match = this.db.collection('matches').add({
        status: "drafting",
        questionCards: this.cardsService.getQuestionCards(),
        answerCards: this.cardsService.getAnswerCards(),
        asking: this.userService.getUserName(),
        players: [{ player : this.userService.getUserUID(), score : 0 }]
    })
    match.then(data => {
        this.matchID = data['id'];
    })
  }

  joinMatch() {

  }

  getMatchID() {
      return this.matchID;
  }
}