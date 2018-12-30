import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from '../models/firebase.user.model';import { UserService } from './user.service';
import { CardsService } from './cards.services';
import { Status } from './../enums/status.enum'
import { Router } from '@angular/router';

@Injectable()
export class MatchService {

    matchID: string;
    askingPlayer: string;
    matchStatus: string;
    cardsOnHand: String[];
    matchPlayers: Array<any>;

    constructor(
        public db: AngularFirestore,
        public afAuth: AngularFireAuth,
        public userService: UserService,
        public cardsService: CardsService,
        public router: Router
    ) { }

    createMatch() {
        var questionCards = this.cardsService.getQuestionCards();
        var answerCards = this.cardsService.getAnswerCards();

        var cardsOnHand = [];
        for (var i = 0; i < 5; i++) {
            cardsOnHand.push(answerCards.pop());
        }

        var match = this.db.collection('matches').add({
            status: Status.waitingPlayers.valueOf(),
            questionCards: questionCards,
            answerCards: answerCards,
            asking: this.userService.getUserName(),
            players: [{ player: this.userService.getUserUID(), name: this.userService.getUserName(), image: this.userService.getUserImage(), score: 0, cards: cardsOnHand }]
        })
        match.then(data => {
            this.matchID = data['id'];
            this.startListeners();
            this.router.navigate(['/start']);
        })
    }

    joinMatch(matchID: string) {
        this.setMatchID(matchID);
        var matchData = this.db.collection('matches').doc(matchID).get();
        matchData.subscribe(data => {
            if (data.get('status') != Status.waitingPlayers.toString()) {
                return;
            }

            var players = data.get('players');
            for (let player of players) {
                if (player['player'] == this.userService.getUserUID()) {
                    return;
                }
            }

            var matchAnswerCards = data.get('answerCards');
            var cardsOnHand = [];
            for (var i = 0; i < 5; i++) {
                cardsOnHand.push(matchAnswerCards.pop());
            }

            var currentPlayer = { player: this.userService.getUserUID(), name: this.userService.getUserName(), image: this.userService.getUserImage(), score: 0, cards: cardsOnHand };
            players.push(currentPlayer);

            this.db.collection('matches').doc(matchID).update({
                players: players,
                answerCards: matchAnswerCards
            })

            this.startListeners();
            this.router.navigate(['/answers']);
        })
    }

    private startListeners() {
        this.getAskingPlayerFromFirebase();
        this.getMatchStatusFromFirebase();
        this.getCardsOnHandFromFirebase();
        this.getMatchPlayersFromFirebase();
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
            for (let player of players) {
                if (player['player'] == this.userService.getUserUID()) {
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
            this.matchStatus = data['status'];
        })
    }

    getMatchStatus() {
        return this.matchStatus;
    }

    private getMatchPlayersFromFirebase() {
        var matchData = this.db.collection('matches').doc(this.matchID).valueChanges();
        matchData.subscribe(data => {
            this.matchPlayers = data['players'];
        })
    }

    getMatchPlayers() {
        return this.matchPlayers;
    }

    getQuestionCards() {
        var matchData = this.db.collection('matches').doc(this.matchID).get();
        return new Promise(resolve => {
            matchData.subscribe(data => {
                var matchQuestionCards = data.get('questionCards');
                var questionCards = []
                for (var i = 0; i < 5; i++) {
                    questionCards.push(matchQuestionCards.pop());
                }
                resolve(questionCards);
            })
        })
    }

    selectQuestionCards(questionCards: String[], selectedCards: String) {
        var matchData = this.db.collection('matches').doc(this.matchID).get();
        matchData.subscribe(data => {
            var matchQuestionCards = data.get('questionCards');

        })
    }
}