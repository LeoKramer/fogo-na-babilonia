import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from '../models/firebase.user.model';import { UserService } from './user.service';
import { CardsService } from './cards.services';
import { Status } from './../enums/status.enum'
import { Router } from '@angular/router';
import { AnswerModel } from '../models/answer.model';

@Injectable()
export class MatchService {

    matchID: string;
    askingPlayer: string;
    matchStatus: string;
    matchPlayers: Array<any>;
    currentQuestion: String;

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
            asking: this.userService.getUserUID(),
            players: [{ player: this.userService.getUserUID(), name: this.userService.getUserName(), image: this.userService.getUserImage(), score: 0, cards: cardsOnHand }],
            answers: [],
            lastBestAnswer: ""
        })
        match.then(data => {
            this.setMatchID(data['id'])
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
        this.getMatchPlayersFromFirebase();
    }

    getMatchID() {
        if (!this.matchID) {
            this.matchID = localStorage.getItem("matchID");
        }

        return this.matchID;
    }

    setMatchID(matchID: string) {
        this.matchID = matchID;
        localStorage.setItem("matchID", matchID)
    }

    private getAskingPlayerFromFirebase() {
        var matchData = this.db.collection('matches').doc(this.getMatchID()).valueChanges();
        return matchData.subscribe(data => {
            this.askingPlayer = data['asking'];
        })
    }

    getAskingPlayer() {
        return this.askingPlayer;
    }

    private getMatchStatusFromFirebase() {
        var matchData = this.db.collection('matches').doc(this.getMatchID()).valueChanges();
        matchData.subscribe(data => {
            this.matchStatus = data['status'];
        })
    }

    getMatchStatus() {
        return this.matchStatus;
    }

    private getMatchPlayersFromFirebase() {
        var matchData = this.db.collection('matches').doc(this.getMatchID()).valueChanges();
        matchData.subscribe(data => {
            this.matchPlayers = data['players'];
        })
    }

    getMatchPlayers() {
        return this.matchPlayers;
    }

    getQuestionCards() {
        var matchData = this.db.collection('matches').doc(this.getMatchID()).get();
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

    startMatch() {
        this.db.collection('matches').doc(this.getMatchID()).update({
            status: Status.waitingQuestion.valueOf()
        }).then(() => {
            this.router.navigate(['/questions']);
        });
    }

    getCurrentQuestion() {
        return this.currentQuestion;
    }

    selectQuestion(selectedCard: String) {
        var matchData = this.db.collection('matches').doc(this.getMatchID()).get();
        matchData.subscribe(data => {
            var matchQuestionCards = data.get('questionCards') as String[]
            matchQuestionCards.splice(matchQuestionCards.indexOf(selectedCard), 1);
            matchQuestionCards = this.cardsService.shuffle(matchQuestionCards);

            this.db.collection('matches').doc(this.getMatchID()).update({
                questionCards: matchQuestionCards,
                status: Status.waitingAswers.valueOf(),
                selectedQuestion: selectedCard
            }).then(() => {
                this.currentQuestion = data['selectedQuestion'];
                this.router.navigate(['/best-answer']);
            })
        })
    }

    registerAnswers(answers: String[]) {
        var matchData = this.db.collection('matches').doc(this.getMatchID()).get();
        matchData.subscribe(data => {
            var answersArray = data.get('answers');
            var playerAnswer = { player: this.userService.getUserUID(), name: this.userService.getUserName(), answers: answers };
            answersArray.push(playerAnswer);

            var cardsOnHand: String[];
            var players = data.get('players');
            for (let player of players) {
                if (player['player'] == this.userService.getUserUID()) {
                    cardsOnHand = player['cards'] as String[];
                    for(let answer of answers) {
                        cardsOnHand.splice(cardsOnHand.indexOf(answer), 1);
                    }
                    player['cards'] = cardsOnHand;
                    break;
                }
            }

            this.db.collection('matches').doc(this.getMatchID()).update({
                answers: answersArray,
                players: players
            })
        })
    }

    selectBest(best: AnswerModel) {
        var matchData = this.db.collection('matches').doc(this.getMatchID()).get();
        matchData.subscribe(data => {
            var matchAnswerCards = data.get('answerCards');

            var players = data.get('players');
            for(let player of players) {
                //search for the winner and increase score
                if(player['player'] == best.player) {
                    player['score'] += 1;
                }
                //make the cards on hand be 5 again
                var cardsOnHand = player['cards'];
                var count = 5 - cardsOnHand.length;
                for(var i = 0; i < count; i++) {
                    cardsOnHand.push(matchAnswerCards.pop())
                }
            }

            this.db.collection('matches').doc(this.getMatchID()).update({
                answerCards: matchAnswerCards,
                players: players,
                status: Status.waitingQuestion.valueOf(),
                asking: best.player.valueOf(),
                selectedQuestion: "",
                answers: [],
                lastBestAnswer: best.player.valueOf()
            }).then(() => {
                this.router.navigate(['/all-answers']);
            })
        })
    }

    getAnswers() {
        var matchData = this.db.collection('matches').doc(this.matchID).get();
        return new Promise(resolve => {
            matchData.subscribe(data => {
                var matchAnswers = data.get('answers');
                resolve(matchAnswers);
            })
        })
    }

    getBestAnswer() {
        var matchData = this.db.collection('matches').doc(this.matchID).get();
        return new Promise(resolve => {
            matchData.subscribe(data => {
                var bestAnswer = data.get('lastBestAnswer');
                resolve(bestAnswer);
            })
        })
    }
}