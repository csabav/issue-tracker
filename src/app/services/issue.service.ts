import { Injectable } from "@angular/core";
import { from, timer, of } from "rxjs";
import { delay, map } from "rxjs/operators";
import * as _ from "lodash";

import { Issue } from "../models/issue.type";
import { Status } from '../models/status.type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.type';
import { Priority } from '../models/priority.type';
import { Note } from '../models/note.type';

@Injectable({
    providedIn: "root"
})
export class IssueService {

    constructor(private http: HttpClient) { }

    getAllIssues() {
        return this.http.get<Issue[]>(environment.apiUrl_REAL + "/api/issues");
    }

    getSingleIssue(id: number) {
        return this.http.get<Issue>(environment.apiUrl_REAL + "/api/issues/" + id);
    }

    getIssuesByAsignee(assignedToId: number) {
        return this.http.get<Issue[]>(environment.apiUrl_REAL + "/api/issues/assignedto/" + assignedToId);
    }

    getIssuesByCreator(createdById: number) {
        return this.http.get<Issue[]>(environment.apiUrl_REAL + "/api/issues/createdby/" + createdById);
    }

    getIssuesByStatus(options?: { userId?: number, statusId?: number }) {
        return this.http.get<Issue[]>(environment.apiUrl_REAL + "/api/issues/status/" + options.statusId + "/user/" + options.userId);
    }

    getIssueStatuses() {
        return this.http.get<Status[]>(environment.apiUrl_REAL + "/api/statuses/");
    }

    getIssueCategories() {
        return this.http.get<Category[]>(environment.apiUrl_REAL + "/api/categories/");
    }

    getIssuePriorities() {
        return this.http.get<Priority[]>(environment.apiUrl_REAL + "/api/priorities/");
    }

    getIssueNotes(issueId: number) {
        return this.http.get<Note[]>(environment.apiUrl_REAL + "/api/notes/issue/" + issueId);
    }

    addOrUpdateIssue(issue: Issue) {
        return this.http.post<any>(environment.apiUrl + "/issues/update/", { issue: issue }).pipe(map(issue => {
            return issue;
        }));
    }

    addStatusNote(note: Note) {
        return this.http.post<any>(environment.apiUrl_REAL + "/api/notes/", note).pipe(map(note => {
            return note;
        }));
    }
}

