import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from '../models/user.model';
import { UserService } from './user.service';
import { CardsService } from './cards.services';

@Injectable()
export class MatchService {

    matchID: string;
    askingPlayer: string;
    matchStatus: string;
    cardsOnHand: String[];

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

    this.getAskingPlayerFromFirebase();
    this.getMatchStatusFromFirebase();
    this.getCardsOnHandFromFirebase();
  }

  joinMatch(matchID: string) {
    this.setMatchID(matchID);
    var matchData = this.db.collection('matches').doc(matchID).get();
    matchData.subscribe(data => {
        var players = data.get('players');
        
        for(let player of players){
            if(player['player'] == this.userService.getUserUID()) {
                return;
            }
        }
        
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

        this.getAskingPlayerFromFirebase();
        this.getMatchStatusFromFirebase();
        this.getCardsOnHandFromFirebase();
    })
  }

  getMatchID() {
      return this.matchID;
  }

  setMatchID(matchID: string) {
      this.matchID = matchID;
  }

  private getCardsOnHandFromFirebase() {
    var matchData = this.db.collection('matches').doc(this.matchID).valueChanges();
    matchData.subscribe(data => {
        var cardsOnHand: String[];
        var players = data['players'];
        for(let player of players){
            if(player['player'] == this.userService.getUserUID()) {
                cardsOnHand = player['cards'];
                break;
            }
        }
        this.cardsOnHand = cardsOnHand;
    })
  }

  getCardsOnHand() {
    return this.cardsOnHand;
  }

  private getAskingPlayerFromFirebase() {
    var matchData = this.db.collection('matches').doc(this.matchID).valueChanges();
    return matchData.subscribe(data => {
        this.askingPlayer = data['asking'];
    })
  }

  getAskingPlayer() {
    return this.askingPlayer;
  }

  private getMatchStatusFromFirebase() {
    var matchData = this.db.collection('matches').doc(this.matchID).valueChanges();
    matchData.subscribe(data => {
        this.matchStatus = data[status];
    })
  }

  getMatchStatus() {
    return this.matchStatus;
  }
}