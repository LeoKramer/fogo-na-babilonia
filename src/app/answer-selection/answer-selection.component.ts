import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer-selection',
  templateUrl: './answer-selection.component.html',
  styleUrls: ['./answer-selection.component.css'],
  inputs: ['cards']
})
export class AnswerSelectionComponent implements OnInit {

  cards: [String]
  constructor() { }

  ngOnInit() {
  }

}
