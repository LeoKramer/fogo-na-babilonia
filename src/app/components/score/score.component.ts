import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from 'src/app/services/user.service';
import { MatchService } from 'src/app/services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  players: UserModel[];
  matchID: string;

  constructor(private db: AngularFirestore, 
              private userService: UserService, 
              private matchService: MatchService,
              private router: Router) 
  { 
    this.matchID = matchService.getMatchID()
    var matchData = this.db.collection('matches').doc(this.matchID).valueChanges();
    matchData.subscribe(data => {
        this.players = data['players'] as UserModel[];
        this.players.sort(function(a, b){return b.score - a.score});
    })
  }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['/']);
  }

}
