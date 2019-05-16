import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Issue } from '../models/issue.type';
import { IssueService } from '../services/issue.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.type';
import * as _ from 'lodash';
import { Category } from '../models/category.type';
import { Priority } from '../models/priority.type';
import { Status } from '../models/status.type';
import { Note } from '../models/note.type';
import { map, first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  selectedIssue: Issue;
  users: User[];
  statuses: Status[];
  categories: Observable<Category[]>;
  priorities: Observable<Priority[]>;
  notes: Observable<Note[]>;

  issueLoading = false;
  issueError = "";

  statusNoteForm: FormGroup;
  statusNoteSubmitted = false;
  statusNoteLoading = false;
  statusNoteError = "";

  constructor(private route: ActivatedRoute,
    private issueService: IssueService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let issueID = +params['id'];
      this.getIssue(issueID);
      this.getNotes(issueID);
    });

    this.getUsers();
    this.getStatuses();
    this.getCategories();
    this.getPriorities();

    this.statusNoteForm = this.formBuilder.group({
      status: ["", Validators.required],
      notes: ["", Validators.required],
    });
  }

  getIssue(id: number) {
    this.issueService.getSingleIssue(id).subscribe(i => this.selectedIssue = i);
  }

  getUsers() {
    this.userService.getAll().subscribe(u => this.users = u);
  }

  getStatuses() {
    this.issueService.getIssueStatuses().subscribe(s => this.statuses = s);
  }

  getCategories() {
    this.categories = this.issueService.getIssueCategories();
  }

  getPriorities() {
    this.priorities = this.issueService.getIssuePriorities();
  }

  getNotes(id: number) {
    this.notes = this.issueService.getIssueNotes(id);
  }

  getUserName(id: number): string {
    let user = _.find(this.users, u => u.id === id);
    return user && user.username;
  }

  getStatusName(id: number): string {
    let status = _.find(this.statuses, s => s.id === id);
    return status && status.name;
  }

  OnSaveIssue() {
    this.issueError = "";
    this.issueLoading = true;

    this.issueService.addOrUpdateIssue(this.selectedIssue).pipe(first()).subscribe(data => {
      this.issueLoading = false;
    }, error => {
      this.issueLoading = false;
      this.issueError = error.message;
    });
  }

  get snf() {
    return this.statusNoteForm.controls;
  }

  OnStatusNoteSave() {
    this.statusNoteSubmitted = true;

    if (this.statusNoteForm.invalid) {
      return;
    }

    this.statusNoteSubmitted = false;
    this.statusNoteError = "";
    this.statusNoteLoading = true;

    let newNote: Note = {
      id: 0,
      createdOn: new Date(),
      issueID: this.selectedIssue.id,
      userID: this.authService.currentUserValue.id,
      statusID: +this.snf.status.value,
      text: this.snf.notes.value
    }

    this.issueService.addStatusNote(newNote).pipe(first()).subscribe(data => {
      this.statusNoteLoading = false;
      this.getNotes(this.selectedIssue.id);
    }, error => {
      this.statusNoteLoading = false;
      this.statusNoteError = error.message;
    });
  }
}
