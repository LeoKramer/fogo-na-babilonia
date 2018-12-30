import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from 'src/app/services/user.service';
import { Status } from 'src/app/enums/status.enum';

@Component({
  selector: 'app-answer-selection',
  templateUrl: './answer-selection.component.html',
  styleUrls: ['./answer-selection.component.css']
})
export class AnswerSelectionComponent implements OnInit {

  question = ''
  numberOfAnswers = 0
  currentAnswer = 0
  selectedAnswers = []
  selectedStrings = []
  answers = []
  isFinished = false
  constructor(private router: Router,
    private matchService: MatchService,
    private db: AngularFirestore,
    private userService: UserService) 
  {
    this.listenToPlayerCards();
    this.listenToQuestionSelected();
    this.listenToAskingPlayer();
  }

  ngOnInit() {
    this.isFinished = false
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

  clean() {
    this.selectedAnswers = []
    this.selectedStrings = []
    for(let answer of this.answers) {
      this.selectedAnswers.push(0)
    }
    this.currentAnswer = 0
  }

  conclude() {
    if (this.currentAnswer == this.numberOfAnswers && !this.isFinished) {
      this.matchService.registerAnswers(this.selectedStrings)
      this.isFinished = !this.isFinished
    }
  }
  
  private listenToQuestionSelected() {
    var matchData = this.db.collection('matches').doc(this.matchService.getMatchID()).valueChanges();
    matchData.subscribe(data => {
      this.question = data['selectedQuestion'];
      this.getNumberOfAnswers();
    })
  }

  selectCard(i: number) {
    if (this.selectedAnswers[i] == 0 && this.currentAnswer < this.numberOfAnswers ) {
      this.selectedAnswers[i] = ++this.currentAnswer;
      this.selectedStrings.push(this.answers[i])
    }
  }

  getNumberOfAnswers() {
    if(this.question == undefined) {
      return;
    }

    this.numberOfAnswers = 0;
    var question = this.question;
    var splitted = question.split("-");
    this.numberOfAnswers = splitted.length - 1;

    if(this.numberOfAnswers <= 0)
      this.numberOfAnswers = 1;
  }

  listenToAskingPlayer() {
    var matchData = this.db.collection('matches').doc(this.matchService.getMatchID()).valueChanges();
    matchData.subscribe(data => {
      if(data['asking'] == this.userService.getUserUID() && data['status'] == Status.waitingQuestion.valueOf()) {
        this.router.navigate(['/questions']);
      }
    })
  }
}
