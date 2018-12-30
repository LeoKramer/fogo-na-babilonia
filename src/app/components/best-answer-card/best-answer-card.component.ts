import { Component, OnInit } from '@angular/core';
import { AnswerModel } from 'src/app/models/answer.model';

@Component({
  selector: 'app-best-answer-card',
  templateUrl: './best-answer-card.component.html',
  styleUrls: ['./best-answer-card.component.css'],
  inputs: ['bestAnswer', 'isSelected', 'showAuthors']
})
export class BestAnswerCardComponent implements OnInit {

  bestAnswer: AnswerModel
  isSelected: false
  showAuthors: false
  constructor() { }

  ngOnInit() {
  }

}
