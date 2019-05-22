import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/models/issue.type';
import { IssueService } from 'src/app/services/issue.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';
import { User } from 'src/app/models/user.type';

/**
 * Displays issues that are closed now and were created by the user or assigned to them
 */
@Component({
  selector: 'app-closed-issues',
  templateUrl: './closed-issues.component.html',
  styleUrls: ['./closed-issues.component.css']
})
export class ClosedIssuesComponent implements OnInit {
  /**
   * Variable for storing the issues that we want to display on the component UI
   */
  issues: Observable<Issue[]>;

  /**
   * Stores the users, so the user names can be easily retrieved
   */
  users: User[];

  constructor(private issueService: IssueService, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.getIssues();
    this.getUsers();
  }

  /**
   * Retrieves the closed issues that were created by the user or assigned to them using the {@link IssueService}
   */
  getIssues() {
    let userId = this.authService.currentUserValue.id;
    let closedStatusId = 4;

    this.issues = this.issueService.getIssuesByStatus({ userId: userId, statusId: closedStatusId });
  }

  /**
   * Retrieves all the users using the {@link UserService}
   */
  getUsers() {
    this.userService.getAll().subscribe(u => this.users = u);
  }

  /**
   * Retrieves the username of the given user ID
   *
   * @param {number} userId The user ID to look for
   * @returns {string} The username
   */
  getUserName(userId: number): string {
    let user = _.find(this.users, u => u.id === userId);
    return user && user.username;
  }
}
