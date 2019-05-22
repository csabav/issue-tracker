import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/models/issue.type';
import { IssueService } from 'src/app/services/issue.service';
import { AuthService } from 'src/app/services/auth.service';
import { Status } from 'src/app/models/status.type';
import * as _ from 'lodash';
import { User } from 'src/app/models/user.type';
import { UserService } from 'src/app/services/user.service';

/**
 * Display issues that were created by the user currently logged in
 */
@Component({
  selector: 'app-created-by-me',
  templateUrl: './created-by-me.component.html',
  styleUrls: ['./created-by-me.component.css']
})
export class CreatedByMeComponent implements OnInit {
  /**
   * Variable for storing the issues that we want to display on the component UI
   */
  issues: Observable<Issue[]>;

  /**
   * Stores the possible issue statuses, so the status names can be easily retrieved
   */
  statuses: Status[];

  /**
   * Stores the users, so the user names can be easily retrieved
   */
  users: User[];

  constructor(private issueService: IssueService, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.getIssues();
    this.getStatuses();
    this.getUsers();
  }

  /**
   * Retrieves the issues created by the user using the {@link IssueService}
   */
  getIssues() {
    let userId = this.authService.currentUserValue.id;

    this.issues = this.issueService.getIssuesByCreator(userId);
  }

  /**
   * Retrieves all the statuses using the {@link IssueService}
   */
  getStatuses() {
    this.issueService.getIssueStatuses().subscribe(s => this.statuses = s);
  }

  /**
   * Retrieves the name of the given status ID
   *
   * @param {number} statusId The status ID to look for
   * @returns {string} The status name
   */
  getStatusName(statusId: number): string {
    let status = _.find(this.statuses, s => s.id === statusId);
    return status && status.name;
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
