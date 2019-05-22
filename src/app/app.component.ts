import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { User } from './models/user.type';
import { AuthService } from './services/auth.service';

/**
 * The main component
 *
 * @class AppComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   * Represents the currently logged in user
   */
  currentUser: User;
  
  /**
   * Part of the responsive UI system, shows if the navbar is open or closed
   */
  navbarOpen = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { 
    this.authService.currentUser.subscribe(u => this.currentUser = u);
  }

  /**
   * Logs out the user using the {@link AuthService} and navigates to the {@link LoginComponent}
   */
  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  /**
   * Part of the responsive UI system, responsible for showing and hiding the navbar on smaller devices
   */
  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }
}
