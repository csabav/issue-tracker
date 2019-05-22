import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/models/issue.type';
import { IssueService } from 'src/app/services/issue.service';
import { AuthService } from 'src/app/services/auth.service';
import { Status } from 'src/app/models/status.type';
import * as _ from 'lodash';

/**
 * Displays issues that were assigned to the user currently logged in
 */
@Component({
  selector: 'app-assigned-to-me',
  templateUrl: './assigned-to-me.component.html',
  styleUrls: ['./assigned-to-me.component.css']
})
export class AssignedToMeComponent implements OnInit {
  /**
   * Variable for storing the issues that we want to display on the component UI
   */
  issues: Observable<Issue[]>;

  /**
   * Stores the possible issue statuses, so the status names can be easily retrieved
   */
  statuses: Status[];

  constructor(private issueService: IssueService, private authService: AuthService) { }

  ngOnInit() {
    this.getIssues();
    this.getStatuses();
  }

  /**
   * Retrieves the issues assigned to the user using the {@link IssueService}
   */
  getIssues() {
    let userId = this.authService.currentUserValue.id;

    this.issues = this.issueService.getIssuesByAsignee(userId);
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
}
