import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FirebaseUserModel } from '../../models/user.model';

@Component({
  selector: 'app-page-main-menu',
  templateUrl: 'main-menu.component.html',
  styleUrls: ['main-menu.component.css']
})
export class MainMenuComponent implements OnInit{

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder
  ) {

  }

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

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }
}
