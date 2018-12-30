import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-question-selection',
  templateUrl: './question-selection.component.html',
  styleUrls: ['./question-selection.component.css']
})
export class QuestionSelectionComponent implements OnInit {

  questions = [];

  constructor(private router: Router,
              private matchService: MatchService) 
  { 
    matchService.getQuestionCards().then(data => {
      this.questions = data as String[];
    });
  }

  ngOnInit() {
  }

  confirm() {
    window.alert("Confirm")
  }
}
