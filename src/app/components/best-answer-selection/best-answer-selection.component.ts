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

  questions = ['Questão 1', 'Questão 2', 'Questão 3']
  constructor(private router: Router,
    private matchService: MatchService,
    private db: AngularFirestore,
    private userService: UserService) 
  {
    this.listenToPlayersAnswers()
  }

  ngOnInit() {
  }

  confirm() {
    window.alert("Confirm")
  }

  listenToPlayersAnswers() {
    
  }
}
