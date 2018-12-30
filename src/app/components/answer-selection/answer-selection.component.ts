import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-answer-selection',
  templateUrl: './answer-selection.component.html',
  styleUrls: ['./answer-selection.component.css']
})
export class AnswerSelectionComponent implements OnInit {

  question = 'Aguarde a seleção da pergunta'
  answers = []
  constructor(private router: Router,
              private matchService: MatchService) 
  { 
    this.answers = matchService.getCardsOnHand();
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
