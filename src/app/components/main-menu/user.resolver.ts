import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../../services/user.service';
import { FirebaseUserModel } from '../../models/user.model';

@Injectable()
export class UserResolver implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        user.image = res.photoURL;
        user.name = res.displayName;
        user.uid = res.uid;
        user.provider = res.providerData[0].providerId;
        
        if(user.provider == "facebook.com") {
          user.image += "?height=500";
        } else if(user.provider == "twitter.com") {
          var image : String = user.image;
          var splitted = image.split("/");
          var param1 = splitted[4];
          
          splitted = splitted[5].split("_");
          var param2 = splitted[0];

          user.image = "https://pbs.twimg.com/profile_images/" + param1 + "/" + param2 + ".jpg";
        }

        this.userService.setUser(user);

        return resolve(user);
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}
