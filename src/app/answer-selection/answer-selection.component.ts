import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-selection',
  templateUrl: './answer-selection.component.html',
  styleUrls: ['./answer-selection.component.css']
})
export class AnswerSelectionComponent implements OnInit {

  question = 'Teste'
  answers = ['Card 1 suaisad asdhuidh', 'Card 2', 'Card 3']
  constructor(private router: Router) { }

  ngOnInit() {
  }

  clean() {
    window.alert("Clean")
  }

  conclude() {
    window.alert("Conclude")
  }
}
