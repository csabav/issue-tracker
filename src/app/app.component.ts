import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { User } from './models/user.type';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Issue Tracker';
  currentUser: User;
  navbarOpen = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { 
    this.authService.currentUser.subscribe(u => this.currentUser = u);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }
}
