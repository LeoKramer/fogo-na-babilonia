import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from 'src/app/services/user.service';
import { Status } from 'src/app/enums/status.enum';

@Component({
  selector: 'app-question-selection',
  templateUrl: './question-selection.component.html',
  styleUrls: ['./question-selection.component.css']
})
export class QuestionSelectionComponent implements OnInit {

  questions = [];
  selectedQuestion = -1
  constructor(private router: Router,
              private matchService: MatchService,
              private db: AngularFirestore,
              private userService: UserService) 
  { 
    var matchData = db.collection('matches').doc(this.matchService.getMatchID()).valueChanges();
    matchData.subscribe(data => {
      if(data['asking'] == this.userService.getUserUID() && data['status'] == Status.waitingQuestion.valueOf()) {
        this.setQuestionCards();
      }
    })
  }

  ngOnInit() {
  }

  selectQuestion(i: number) {
    this.selectedQuestion = i;
  }

  confirm() {
    if (this.selectedQuestion >= 0) {
      this.matchService.selectQuestion(this.questions[this.selectedQuestion]);
    }
  }

  setQuestionCards() {
    this.matchService.getQuestionCards().then(data => {
      this.questions = data as String[];
    });
  }
}
