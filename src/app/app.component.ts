import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showMenu: boolean = false

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.authService.isAuthenticatedEmitter.subscribe( isAuthenticated => {
      this.showMenu = isAuthenticated
    });
  }

  logout(){
    this.authService.doLogout()
    .then( () => {
      this.router.navigate(['/login'])
    }, error => {
      console.log("Logout error", error);
    });
  }
}
