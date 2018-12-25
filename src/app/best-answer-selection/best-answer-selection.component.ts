import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-best-answer-selection',
  templateUrl: './best-answer-selection.component.html',
  styleUrls: ['./best-answer-selection.component.css']
})
export class BestAnswerSelectionComponent implements OnInit {

  questions = ['Questão 1', 'Questão 2', 'Questão 3']
  constructor(private router: Router) { }

  ngOnInit() {
  }

  confirm() {
    window.alert("Confirm")
  }
}
