import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css'],
  inputs: ['question', 'isSelected']
})
export class QuestionCardComponent implements OnInit {

  question: String
  isSelected: false
  constructor() { }

  ngOnInit() {
  }

}
