import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Issue } from '../models/issue.type';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  selectedIssue: Issue;

  constructor(private route: ActivatedRoute,
    private issueService: IssueService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let issueID = +params['id']; // the '+' operator converts the param string into a number
      this.getIssue(issueID);
    });
  }

  getIssue(id: number) {
    this.issueService.getSingleIssue(id).subscribe(i => this.selectedIssue = i);
    console.log(this.selectedIssue);
  }

}
