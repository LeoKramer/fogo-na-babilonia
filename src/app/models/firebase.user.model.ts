export class FirebaseUserModel {
  image: string;
  name: string;
  uid: string;
  provider: string;

  constructor(){
    this.image = "";
    this.name = "";
    this.uid = "";
    this.provider = "";
  }
}
