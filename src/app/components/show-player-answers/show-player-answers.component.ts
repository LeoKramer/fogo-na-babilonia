import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AnswerModel } from 'src/app/models/answer.model';
import { UserService } from 'src/app/services/user.service';
import { Status } from 'src/app/enums/status.enum';

@Component({
  selector: 'app-show-player-answers',
  templateUrl: './show-player-answers.component.html',
  styleUrls: ['./show-player-answers.component.css']
})
export class ShowPlayerAnswersComponent implements OnInit {

  bestAnswers: AnswerModel[] = [];
  selectedBest = -1;
  askingPlayer = false;

  constructor(private router: Router,
              private matchService: MatchService,
              private db: AngularFirestore,
              private userService: UserService) 
  { 
    this.listenToMatchAnswers();
  }

  ngOnInit() {
  }

  next() {
    var matchData = this.db.collection('matches').doc(this.matchService.getMatchID()).get();
      matchData.subscribe(data => {
        var newAskingPlayer = data.get('lastBestAnswer');
        this.db.collection('matches').doc(this.matchService.getMatchID()).update({
          asking: newAskingPlayer,
          status: Status.waitingQuestion.valueOf(),
          answers: [],
          selectedQuestion: ""
      }).then(() => {
        this.router.navigate(['/answers']);
      })
    })
  }

  finish() {

  }

  listenToMatchAnswers() {
    var matchData = this.db.collection('matches').doc(this.matchService.getMatchID()).valueChanges();
    matchData.subscribe(data => {
      this.bestAnswers = []
      this.selectedBest = -1;
      this.askingPlayer = false;

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
              answerString += playerAnswers[0].toUpperCase();
            }
          }
          var answerToSave: AnswerModel = {
            name: answer['name'],
            player: answer['player'],
            answer: answerString
          }
          
          this.bestAnswers.push(answerToSave);

          if(answerToSave.player == data['lastBestAnswer']) {
            this.selectedBest = this.bestAnswers.indexOf(answerToSave);
          }
        }
      }
      if(data['asking'] == this.userService.getUserUID()){
        this.askingPlayer = true;
      }
    })
  }
}
