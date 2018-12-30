import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-best-answer-selection',
  templateUrl: './best-answer-selection.component.html',
  styleUrls: ['./best-answer-selection.component.css']
})
export class BestAnswerSelectionComponent implements OnInit {

  questions = []
  selectedBest = -1
  constructor(private router: Router,
    private matchService: MatchService,
    private db: AngularFirestore,
    private userService: UserService) 
  {
    this.listenToPlayersAnswers()
  }

  ngOnInit() {
  }

  selectBest(i: number) {
    this.selectedBest = i;
  }

  confirm() {
    window.alert(this.selectedBest)
  }

  listenToPlayersAnswers() {
    var matchData = this.db.collection('matches').doc(this.matchService.getMatchID()).valueChanges();
    matchData.subscribe(data => {
      var question = data['selectedQuestion'].split(" ");

      var answers = data['answers'];
      if(answers != undefined) {
        for(let answer of answers) {
          var answerString = "";
          var playerAnswers = answer['answers']
          var count = 0;

          if(playerAnswers != undefined) {
            for(let word of question) {
              if(word == "-") {
                word = playerAnswers[count].toUpperCase();
                count++;
              }
              answerString += word + " ";
            }
            if(count == 0) {
              answerString += playerAnswers[0];
            }
          }
          this.questions.push(answerString)
        }
      }
      if(data['answers'].length == data['players'].length) {

      }
    })
  }
}
