import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/models/issue.type';
import { IssueService } from 'src/app/services/issue.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';
import { User } from 'src/app/models/user.type';

@Component({
  selector: 'app-closed-issues',
  templateUrl: './closed-issues.component.html',
  styleUrls: ['./closed-issues.component.css']
})
export class ClosedIssuesComponent implements OnInit {
  issues: Observable<Issue[]>;
  users: User[];

  constructor(private issueService: IssueService, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.getIssues();
    this.getUsers();
  }

  getIssues() {
    let userId = this.authService.currentUserValue.id;
    let closedStatusId = 103;

    this.issues = this.issueService.getIssuesByStatus({ userId: userId, statusId: closedStatusId });
  }

  getUsers() {
    this.userService.getAll().subscribe(u => this.users = u);
  }

  getUserName(userId: number) {
    let user = _.find(this.users, u => u.id === userId);
    return user && user.username;
  }
}
