import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CardsService } from '../../services/cards.services';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../../models/firebase.user.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-page-main-menu',
  templateUrl: 'main-menu.component.html',
  styleUrls: ['main-menu.component.css']
})
export class MainMenuComponent implements OnInit{

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;
  model: any = {};

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public cardsService: CardsService,
    public matchService: MatchService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    })
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))
  }

  onSubmit() {
    this.matchService.joinMatch(String(this.model.matchID));
  }

  createMatch() {
    this.matchService.createMatch();
  }

  // pasteToInput() {

  // }
}
