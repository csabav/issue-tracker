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
        return this.http.get<Issue[]>(environment.apiUrl + "/issues");
    }

    getSingleIssue(id: number) {
        return this.http.get<Issue>(environment.apiUrl + "/issue/" + id);
    }

    getIssuesByAsignee(assignedToID: number) {
        return this.http.get<Issue[]>(environment.apiUrl + "/issues/assignedto/" + assignedToID);
    }

    getIssuesByCreator(createdByID: number) {
        return this.http.get<Issue[]>(environment.apiUrl + "/issues/createdby/" + createdByID);
    }

    getIssuesByStatus(options?: { userID?: number, statusID?: number }) {
        return this.http.get<Issue[]>(environment.apiUrl + "/issues/status/" + options.statusID + "/user/" + options.userID);
    }

    getIssueStatuses() {
        return this.http.get<Status[]>(environment.apiUrl + "/statuses/");
    }

    getIssueCategories() {
        return this.http.get<Category[]>(environment.apiUrl + "/categories/");
    }

    getIssuePriorities() {
        return this.http.get<Priority[]>(environment.apiUrl + "/priorities/");
    }

    getIssueNotes(issueID: number) {
        return this.http.get<Note[]>(environment.apiUrl + "/notes/issue/" + issueID);
    }

    addOrUpdateIssue(issue: Issue) {
        return this.http.post<any>(environment.apiUrl + "/issues/update/", { issue: issue }).pipe(map(issue => {
            return issue;
        }));
    }

    addStatusNote(note: Note) {
        return this.http.post<any>(environment.apiUrl + "/notes/add/", {note: note}).pipe(map(note => {
            return note;
        }));
    }
}

