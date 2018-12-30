import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from 'src/app/services/user.service';
import { MatchService } from 'src/app/services/match.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {
  players: UserModel[];
  matchID: string;

  constructor(private db: AngularFirestore, 
              private userService: UserService, 
              private matchService: MatchService) 
  { 
    this.matchID = matchService.getMatchID()
    var matchData = this.db.collection('matches').doc(this.matchID).valueChanges();
    matchData.subscribe(data => {
        this.players = data['players'] as UserModel[];
        console.log(data['players'])
    })
  }

  ngOnInit() {
  }

  copyToClipboard() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.matchID));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  startMatch() {
    this.matchService.startMatch();

  }
}
