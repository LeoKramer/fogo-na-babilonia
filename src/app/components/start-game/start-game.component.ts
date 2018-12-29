import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from 'src/app/services/user.service';
import { FirebaseUserModel } from 'src/app/models/user.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {
  players: FirebaseUserModel[];

  constructor(private db: AngularFirestore, 
              private userService: UserService, 
              private matchService: MatchService) 
  { 
    var matchData = this.db.collection('matches').doc(matchService.getMatchID()).valueChanges();
    matchData.subscribe(data => {
        //this.players = data['players'] as FirebaseUserModel[];
        console.log(data['players'])
    })
  }

  ngOnInit() {
  }

}
