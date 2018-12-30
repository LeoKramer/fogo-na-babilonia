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

  question = 'Aguarde a seleção da pergunta'
  answers = []
  constructor(private router: Router,
    private matchService: MatchService,
    private db: AngularFirestore,
    private userService: UserService) 
  {
    var matchData = this.db.collection('matches').doc(matchService.getMatchID()).valueChanges();
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
    })
  }

  ngOnInit() {
  }

  clean() {
    window.alert("Clean")
  }

  conclude() {
    window.alert("Conclude")
  }
}
