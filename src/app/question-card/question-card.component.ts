import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css'],
  inputs: ['question']
})
export class QuestionCardComponent implements OnInit {

  question: String
  constructor() { }

  ngOnInit() {
  }

}
