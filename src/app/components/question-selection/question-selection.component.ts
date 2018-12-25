import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-selection',
  templateUrl: './question-selection.component.html',
  styleUrls: ['./question-selection.component.css']
})
export class QuestionSelectionComponent implements OnInit {

  questions = ['Questão 1', 'Questão 2', 'Questão 3']
  constructor(private router: Router) { }

  ngOnInit() {
  }

  confirm() {
    window.alert("Confirm")
  }
}
