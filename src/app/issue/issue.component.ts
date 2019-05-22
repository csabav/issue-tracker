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

/**
 * The issue detail component. Users can view and update an issue here
 */
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  /**
   * The selected issue currently displayed on the page
   */
  selectedIssue: Issue;
  
  /**
   * The users that the issue can be assigned to
   */
  users: User[];
  
  /**
   * The statuses that the issue can be assigned to
   */
  statuses: Status[];

  /**
   * The categories that the issue can pick up
   */
  categories: Category[];

  /**
   * The priorities the issue can be assigned to
   */
  priorities: Observable<Priority[]>;

  /**
   * The notes that were added to the selected issue
   */
  notes: Observable<Note[]>;

  /**
   * Is true when the Save button was clicked to update the selected issue
   */
  issueLoading = false;
  
  /**
   * Stores the error messages coming from the {@link IssueService}
   */
  issueError = "";

  /**
   * The Reactive Form object for adding a new status note to the issue
   */
  statusNoteForm: FormGroup;

  /**
   * Is true if the Save button was clicked to add a new status note, helps displaying client-side validation errors on the input fields
   */
  statusNoteSubmitted = false;

  /**
   * Is true when the Save button was clicked to add a new status note and the saving process started running
   */
  statusNoteLoading = false;

  /**
   * Stores the error messages coming from the {@link IssueService} after a failed status note creation
   */
  statusNoteError = "";

  constructor(private route: ActivatedRoute,
    private issueService: IssueService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let issueId = +params['id'];
      this.getIssue(issueId);
      this.getNotes(issueId);
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
    this.issueService.getSingleIssue(id).subscribe(i => {
      this.selectedIssue = i;
      this.snf.status.setValue(this.selectedIssue.statusId);
    });
  }

  /**
   * Retrieves the users using the {@link IssueService}
   */
  getUsers() {
    this.userService.getAll().subscribe(u => {
      this.users = u;
    });
  }

  /**
   * Retrieves the statuses using the {@link IssueService}
   */
  getStatuses() {
    this.issueService.getIssueStatuses().subscribe(s => this.statuses = s);
  }

  /**
   * Retrieves the categories using the {@link IssueService}
   */
  getCategories() {
    this.issueService.getIssueCategories().subscribe(c => {
      this.categories = c;
    });
  }

  /**
   * Retrieves the priorities using the {@link IssueService}
   */
  getPriorities() {
    this.priorities = this.issueService.getIssuePriorities();
  }

  /**
   * Retrieves the status notes that belong to the selected issue using the {@link IssueService}
   */
  getNotes(id: number) {
    this.notes = this.issueService.getIssueNotes(id);
  }

  /**
   * Retrieves the username of the given user ID
   *
   * @param {number} userId The user ID to look for
   * @returns {string} The username
   */
  getUserName(id: number): string {
    let user = _.find(this.users, u => u.id === id);
    return user && user.username;
  }

  /**
   * Retrieves the name of the given status ID
   *
   * @param {number} statusId The status ID to look for
   * @returns {string} The status name
   */
  getStatusName(id: number): string {
    let status = _.find(this.statuses, s => s.id === id);
    return status && status.name;
  }

  /**
   * Executed when clicking on the Save button to update the selected issue's details. Validates the form and starts the saving process.
   */
  OnSaveIssue() {
    this.issueError = "";
    this.issueLoading = true;

    this.issueService.addOrUpdateIssue(this.selectedIssue).pipe(first()).subscribe(data => {
      this.issueLoading = false;
    }, error => {
      this.issueLoading = false;
      this.issueError = error.error.message || error.error[0];
    });
  }

  /**
   * Gets all the controls from the status note form
   */
  get snf() {
    return this.statusNoteForm.controls;
  }

  /**
   * Executed when clicking on the Save button to add a new status note. Validates the form and starts the saving process. Also updates the UI in the end to display the newly added note.
   */
  OnStatusNoteSave() {
    this.statusNoteSubmitted = true;

    if (this.statusNoteForm.invalid) {
      return;
    }

    this.statusNoteSubmitted = false;
    this.statusNoteError = "";
    this.statusNoteLoading = true;

    let newNote: Note = {
      issueId: this.selectedIssue.id,
      userId: this.authService.currentUserValue.id,
      statusId: +this.snf.status.value,
      text: this.snf.notes.value
    }

    this.issueService.addStatusNote(newNote).pipe(first()).subscribe(data => {
      this.statusNoteLoading = false;
      this.getNotes(this.selectedIssue.id);
      this.getIssue(this.selectedIssue.id);
      this.statusNoteForm.reset();
    }, error => {
      this.statusNoteLoading = false;
      this.statusNoteError = error.error.message || error.error[0];
    });
  }
}
