import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from '../models/user.model';
import { UserService } from './user.service';
import { CardsService } from './cards.services';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class MatchService {

    matchID: string;

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth,
   public userService: UserService,
   public cardsService: CardsService
  ){ }

  createMatch() {
    var questionCards = this.cardsService.getQuestionCards();
    var answerCards = this.cardsService.getAnswerCards();

    var cardsOnHand = [];
    for(var i = 0; i < 5; i++) {
        cardsOnHand.push(answerCards.pop());
    }

    var match = this.db.collection('matches').add({
        status: "drafting",
        questionCards: questionCards,
        answerCards: answerCards,
        asking: this.userService.getUserName(),
        players: [{ player : this.userService.getUserUID(), score : 0 , cards : cardsOnHand}]
    })
    match.then(data => {
        this.matchID = data['id'];
    })
  }

  joinMatch(matchID: string) {
    this.setMatchID(matchID);
    var matchData = this.db.collection('matches').doc(matchID).get();
    matchData.subscribe(data => {
        var players = data.get('players');

        var matchAnswerCards = data.get('answerCards');
        var cardsOnHand = [];
        for(var i = 0; i < 5; i++) {
            cardsOnHand.push(matchAnswerCards.pop());
        }

        var currentPlayer = {player : this.userService.getUserUID(), score : 0, cards: cardsOnHand};
        players.push(currentPlayer);

        this.db.collection('matches').doc(matchID).update({
            players: players,
            answerCards : matchAnswerCards
        })

        this.getCardsOnHand()
    })
  }

  getMatchID() {
      return this.matchID;
  }

  setMatchID(matchID: string) {
      this.matchID = matchID;
  }

  getCardsOnHand() {
    var matchData = this.db.collection('matches').doc(this.matchID).get();
    matchData.subscribe(data => {
        var cardsOnHand: String[];
        var players = data.get('players');
        for(let player of players){
            if(player['player'] == this.userService.getUserUID()) {
                cardsOnHand = player['cards'];
            }
        }
        return cardsOnHand;
    })
  }
}