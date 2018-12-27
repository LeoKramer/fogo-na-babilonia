import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class CardsService {

    questionCards: String[] = [];
    answerCards: String[] = [];

    constructor(public db: AngularFirestore){ 
        this.getQuestionCardsFromFirebase();
        this.getAnswerCardsFromFirebase();
    }

    getQuestionCardsFromFirebase() {
        var questionsObservable: Observable<{}> = this.db.collection('cards').doc('questions').valueChanges();
        questionsObservable.subscribe(data => {
            this.questionCards = [];
            for(var i = 1; i <= data['numberOfCards']; i++) {
                this.questionCards.push(data['question'+i]);
            }
            this.questionCards = this.shuffle(this.questionCards);
        })
    }

    getAnswerCardsFromFirebase() {
        var answersObservable: Observable<{}> = this.db.collection('cards').doc('answers').valueChanges();
        answersObservable.subscribe(data => {
            this.answerCards = [];
            for(var i = 1; i <= data['numberOfCards']; i++) {
                this.answerCards.push(data['answer'+i]);
            }
            this.answerCards = this.shuffle(this.answerCards);
        })
    }

    getQuestionCards() : String[] {
        return this.questionCards;
    }

    getAnswerCards() : String[] {
        return this.answerCards;
    }

    shuffle(array: String[]) : String[] {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }
}
