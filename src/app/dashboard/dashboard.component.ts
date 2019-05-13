import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Issue } from '../models/issue.type';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor() { }

  ngOnInit() { }
}
