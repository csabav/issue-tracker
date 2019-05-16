import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/models/issue.type';
import { IssueService } from 'src/app/services/issue.service';
import { AuthService } from 'src/app/services/auth.service';
import { Status } from 'src/app/models/status.type';
import * as _ from 'lodash';
import { User } from 'src/app/models/user.type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-created-by-me',
  templateUrl: './created-by-me.component.html',
  styleUrls: ['./created-by-me.component.css']
})
export class CreatedByMeComponent implements OnInit {
  issues: Observable<Issue[]>;
  statuses: Status[];
  users: User[];

  constructor(private issueService: IssueService, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.getIssues();
    this.getStatuses();
    this.getUsers();
  }

  getIssues() {
    let userID = this.authService.currentUserValue.id;

    this.issues = this.issueService.getIssuesByCreator(userID);
  }

  getStatuses(){
    this.issueService.getIssueStatuses().subscribe(s => this.statuses = s);
  }

  getStatusName(statusID: number){
    let status = _.find(this.statuses, s => s.id === statusID);
    return status && status.name;
  }

  getUsers(){
    this.userService.getAll().subscribe(u => this.users = u);
  }

  getUserName(userID: number){
    let user = _.find(this.users, u => u.id === userID);
    return user && user.username;
  }

}
