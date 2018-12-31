import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from 'src/app/services/user.service';
import { AnswerModel } from '../../models/answer.model';
import { Status } from 'src/app/enums/status.enum';

@Component({
  selector: 'app-best-answer-selection',
  templateUrl: './best-answer-selection.component.html',
  styleUrls: ['./best-answer-selection.component.css']
})
export class BestAnswerSelectionComponent implements OnInit {

  bestAnswers: AnswerModel[] = [];
  selectedBest = -1;
  numberOfAnswers : String = ""

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
    this.matchService.selectBest(this.bestAnswers[this.selectedBest]);
    this.bestAnswers = []
  }

  listenToPlayersAnswers() {
    var matchData = this.db.collection('matches').doc(this.matchService.getMatchID()).valueChanges();
    matchData.subscribe(data => {
      this.bestAnswers = []
      this.selectedBest = -1;
      this.numberOfAnswers = "";

      var question = data['selectedQuestion'].split(" ");

      var totalOfAnswers = 0;
      var totalOfPlayers = data['players'].length;

      var players = data['players']

      for(let player of players) {
        var playerID = "" + player['player'];
        this.db.collection('matches').doc(this.matchService.getMatchID()).collection('players').doc(playerID).valueChanges().subscribe(playerdata => {
          var answers = playerdata['answers'];

          if(answers.length != 0) {
            var answerString = "";
            var count = 0;

            question = data['selectedQuestion'].split(" ");

            for(let word of question) {
              if(word == "-") {
                word = answers[count].toUpperCase();
                count++;
              }
              answerString += word + " ";
            }
            if(count == 0) {
              answerString += answers[0].toUpperCase();
            }

            var answerToSave: AnswerModel = {
              name: playerdata['name'],
              player: playerdata['player'],
              answer: answerString
            }

            var foundInVector = false;
            for(let bestanswer of this.bestAnswers) {
              if(bestanswer['player'] == answerToSave['player']) {
                foundInVector = true;
                break;
              }
            }

            if(!foundInVector) {
              this.bestAnswers.push(answerToSave);
              totalOfAnswers++;
            }

            this.numberOfAnswers = "Respondidos: " + totalOfAnswers + " de " + (totalOfPlayers - 1);
            this.cleanRepeated();
            if(totalOfAnswers == totalOfPlayers - 1 && data['status'] == Status.waitingAswers.valueOf()) {
              this.db.collection('matches').doc(this.matchService.getMatchID()).update({
                answers: this.bestAnswers,
                status : Status.selectingBest.valueOf()
              })
            }
          }
          if(answers.length == 0) {
            this.numberOfAnswers = "Respondidos: 0 de " + (totalOfPlayers - 1);
          }
        })
      }
    })
  }

  cleanRepeated() {
    if(this.bestAnswers == undefined)
      return;

    //make sure that there's no repeated cards
    var temp: AnswerModel[] = [];
    temp.push(this.bestAnswers.pop())
    for(let answer of this.bestAnswers) {
      var found = false
      for(let tempAnswer of temp) {
        if(tempAnswer == answer) {
          found = true;
          break;
        }
      }
      if(!found) {
        temp.push(this.bestAnswers.pop())
      }
    }

    this.bestAnswers = temp;
  }
}
