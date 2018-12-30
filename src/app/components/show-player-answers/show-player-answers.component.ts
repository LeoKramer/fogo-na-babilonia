import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-show-player-answers',
  templateUrl: './show-player-answers.component.html',
  styleUrls: ['./show-player-answers.component.css']
})
export class ShowPlayerAnswersComponent implements OnInit {

  bestAnswers = [];

  constructor(private router: Router,
              private matchService: MatchService,
              private db: AngularFirestore) 
  { 
    this.listenToMatchAnswers();
  }

  ngOnInit() {
  }

  next() {
    
  }

  finish() {

  }

  listenToMatchAnswers() {
    var matchData = this.db.collection('matches').doc(this.matchService.getMatchID()).valueChanges();
    matchData.subscribe(data => {
      this.bestAnswers = [];
    })
  }
}
