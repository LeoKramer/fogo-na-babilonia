import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css'],
  inputs: ['cards']
})
export class CardContainerComponent implements OnInit {

  cards: [String]
  constructor() { }

  ngOnInit() {
  }

}
