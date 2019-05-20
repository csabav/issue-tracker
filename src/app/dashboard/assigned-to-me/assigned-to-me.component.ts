import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/models/issue.type';
import { IssueService } from 'src/app/services/issue.service';
import { AuthService } from 'src/app/services/auth.service';
import { Status } from 'src/app/models/status.type';
import * as _ from 'lodash';

@Component({
  selector: 'app-assigned-to-me',
  templateUrl: './assigned-to-me.component.html',
  styleUrls: ['./assigned-to-me.component.css']
})
export class AssignedToMeComponent implements OnInit {
  issues: Observable<Issue[]>;
  statuses: Status[];

  constructor(private issueService: IssueService, private authService: AuthService) { }

  ngOnInit() {
    this.getIssues();
    this.getStatuses();
  }

  getIssues() {
    let userId = this.authService.currentUserValue.id;
    
    this.issues = this.issueService.getIssuesByAsignee(userId);
  }

  getStatuses(){
    this.issueService.getIssueStatuses().subscribe(s => this.statuses = s);
  }

  getStatusName(statusId: number){
    let status = _.find(this.statuses, s => s.id === statusId);
    return status && status.name;
  }
}
