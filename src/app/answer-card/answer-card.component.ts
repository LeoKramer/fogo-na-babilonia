import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.css'],
  inputs: ['answer', 'selectionNumber']
})
export class AnswerCardComponent implements OnInit {

  answer: String
  selectionNumber: Number
  constructor() { }

  ngOnInit() {
  }

}
