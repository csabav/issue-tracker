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
    let userId = this.authService.currentUserValue.id;

    this.issues = this.issueService.getIssuesByCreator(userId);
  }

  getStatuses(){
    this.issueService.getIssueStatuses().subscribe(s => this.statuses = s);
  }

  getStatusName(statusId: number){
    let status = _.find(this.statuses, s => s.id === statusId);
    return status && status.name;
  }

  getUsers(){
    this.userService.getAll().subscribe(u => this.users = u);
  }

  getUserName(userId: number){
    let user = _.find(this.users, u => u.id === userId);
    return user && user.username;
  }

}
