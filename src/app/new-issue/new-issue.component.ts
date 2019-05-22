import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.type';
import { Status } from '../models/status.type';
import { Observable } from 'rxjs';
import { Category } from '../models/category.type';
import { Priority } from '../models/priority.type';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { IssueService } from '../services/issue.service';
import { Issue } from '../models/issue.type';
import { Router } from '@angular/router';

/**
 * The place for creating new issues
 */
@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit {
  /**
   * The users that the new issue can be assigned to
   */
  users: User[];

  /**
   * The categories the new issue can pick up
   */
  categories: Category[];

  /**
   * The priorities the new issue can be assigned to
   */
  priorities: Priority[];

  /**
   * The Reactive Form object
   */
  issueForm: FormGroup;
  
  /**
   * Is true if the Save button was clicked, helps displaying client-side validation errors on the input fields
   */
  submitted = false;

  /**
   * Is true if the Save button was clicked and the saving process started running
   */
  loading = false;

  /**
   * The error messages coming from the {@link IssueService} are stored here
   */
  error = "";

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private issueService: IssueService,
    private router: Router) { }

  ngOnInit() {
    this.getUsers();
    this.getCategories();
    this.getPriorities();

    this.issueForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      assignedto: ["", Validators.required],
      category: ["", Validators.required],
      priority: ["", Validators.required],
      duedate: ["", Validators.required]
    });
  }

  /**
   * Gets all the controls from the form
   */
  get f() {
    return this.issueForm.controls;
  }


  /**
   * Retrieves the priorities using the {@link IssueService} and sets the default value in the priorities dropdown
   */
  getPriorities() {
    this.issueService.getIssuePriorities().subscribe(p => {
      this.priorities = p;
      this.f.priority.setValue(this.priorities[0]);
    });
  }

  /**
   * Retrieves the categories using the {@link IssueService} and sets the default value in the categories dropdown
   */
  getCategories() {
    this.issueService.getIssueCategories().subscribe(c => {
      this.categories = c;
      this.f.category.setValue(this.categories[0]);
    });
  }

  /**
   * Retrieves the users using the {@link IssueService} and sets the default value in the users dropdown
   */
  getUsers() {
    this.userService.getAll().subscribe(u => {
      this.users = u;
      this.f.assignedto.setValue(this.users[0]);
    });
  }

  /**
   * Executed when the Save button is clicked. Validates the form and starts the saving process using the {@link IssueService}.
   * If the process was successful it navigates the user to the issue detail page
   */
  OnSubmit() {
    this.submitted = true;

    if (this.issueForm.invalid) {
      return;
    }

    this.submitted = false;
    this.error = "";
    this.loading = true;

    let newIssue: any = {
      title: this.f.title.value,
      description: this.f.description.value,
      assignedToId: this.f.assignedto.value.id,
      createdById: this.authService.currentUserValue.id,
      categoryId: this.f.category.value.id,
      priorityId: this.f.priority.value.id,
      dueOn: new Date(this.f.duedate.value)
    };

    this.issueService.addOrUpdateIssue(newIssue).subscribe(data => {
      this.router.navigate(["/issue/" + data.id]);
    }, error => {
      this.error = error.error.message;
      this.loading = false;
    });
  }
}
