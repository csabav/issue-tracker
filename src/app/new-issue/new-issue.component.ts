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

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit {
  users: User[];
  statuses: Status[];
  categories: Category[];
  priorities: Priority[];

  issueForm: FormGroup;
  submitted = false;
  loading = false;
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

  get f() {
    return this.issueForm.controls;
  }

  getPriorities() {
    this.issueService.getIssuePriorities().subscribe(p => {
      this.priorities = p;
      this.f.priority.setValue(this.priorities[0]);
    });
  }

  getCategories() {
    this.issueService.getIssueCategories().subscribe(c => {
      this.categories = c;
      this.f.category.setValue(this.categories[0]);
    });
  }

  getUsers() {
    this.userService.getAll().subscribe(u => {
      this.users = u;
      this.f.assignedto.setValue(this.users[0]);
    });
  }

  OnSubmit() {
    this.submitted = true;

    if (this.issueForm.invalid) {
      return;
    }

    this.submitted = false;
    this.error = "";
    this.loading = true;

    let newIssue: Issue = {
      id: 0, // will be initialized later
      createdOn: new Date(),
      title: this.f.title.value,
      description: this.f.description.value,
      assignedToId: this.f.assignedto.value.id,
      createdById: this.authService.currentUserValue.id,
      statusId: 100, // created
      categoryId: this.f.category.value.id,
      priorityId: this.f.priority.value.id,
      dueOn: new Date(this.f.duedate.value)
    };

    console.log(newIssue);

    this.issueService.addOrUpdateIssue(newIssue).subscribe(data => {
      this.router.navigate(["/issue/" + data.id]);
    }, error => {
      this.error = error.message;
      this.loading = false;
    });
  }
}
