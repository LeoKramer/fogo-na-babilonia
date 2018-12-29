import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router) {
      router.events.subscribe((res) => {
          if (res instanceof NavigationEnd) {
            this.isLogoutButtonEnabled = (res instanceof NavigationEnd) &&(res.url !== '/login')
          }
        }
      )
    }

    isLogoutButtonEnabled: Boolean = false
    ngOnInit() {
    }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['/login'])
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
