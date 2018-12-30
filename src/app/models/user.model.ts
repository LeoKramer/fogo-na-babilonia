export class UserModel {
  image: string;
  name: string;
  player: string;
  score: number;
  cards: String[]

  constructor(){
    this.image = "";
    this.name = "";
    this.player = "";
    this.score = 0;
    this.cards = [];
  }
}
