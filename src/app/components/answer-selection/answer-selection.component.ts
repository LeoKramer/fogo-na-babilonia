import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-answer-selection',
  templateUrl: './answer-selection.component.html',
  styleUrls: ['./answer-selection.component.css']
})
export class AnswerSelectionComponent implements OnInit {

  question = ''
  numberOfAnswers = 3
  currentAnswer = 0
  selectedAnswers = []
  selectedStrings = []
  answers = []
  constructor(private router: Router,
    private matchService: MatchService,
    private db: AngularFirestore,
    private userService: UserService) 
  {
    this.listenToPlayerCards();
    this.listenToQuestionSelected();
  }

  private listenToPlayerCards() {
    var matchData = this.db.collection('matches').doc(this.matchService.getMatchID()).valueChanges();
    matchData.subscribe(data => {
      var cardsOnHand: String[];
      var players = data['players'];
      for (let player of players) {
        if (player['player'] == this.userService.getUserUID()) {
          cardsOnHand = player['cards'];
          break;
        }
      }
      this.answers = cardsOnHand;
      this.clean()
    })
  }

  ngOnInit() {
  }

  clean() {
    this.selectedAnswers = []
    this.selectedStrings = []
    for(let answer of this.answers) {
      this.selectedAnswers.push(0)
    }
    this.currentAnswer = 0
  }

  conclude() {
    this.matchService.registerAnswers(this.selectedStrings)
  }
  
  private listenToQuestionSelected() {
    var matchData = this.db.collection('matches').doc(this.matchService.getMatchID()).valueChanges();
    matchData.subscribe(data => {
      this.question = data['selectedQuestion']
    })
  }

  selectCard(i: number) {
    if (this.selectedAnswers[i] == 0 && this.currentAnswer < this.numberOfAnswers ) {
      this.selectedAnswers[i] = ++this.currentAnswer;
      this.selectedStrings.push(this.answers[i])
    }
  }
}
