import { Injectable } from "@angular/core";
import { from, timer, of, Observable } from "rxjs";
import { delay, map } from "rxjs/operators";
import * as _ from "lodash";

import { Issue } from "../models/issue.type";
import { Status } from '../models/status.type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.type';
import { Priority } from '../models/priority.type';
import { Note } from '../models/note.type';

/**
 * A service to communicate between the API and {@link Issue}, {@link Status}, {@link Category}, {@link Priority} and {@link Note} objects
 */
@Injectable({
    providedIn: "root"
})
export class IssueService {

    constructor(private http: HttpClient) { }

    /**
     * Returns all the issues stored in the database
     */
    getAllIssues(): Observable<Issue[]> {
        return this.http.get<Issue[]>(environment.apiUrl_REAL + "/api/issues");
    }

    /**
     * Returns the details of a single issue
     *
     * @param {number} id   The issue ID to look for
     */
    getSingleIssue(id: number): Observable<Issue> {
        return this.http.get<Issue>(environment.apiUrl_REAL + "/api/issues/" + id);
    }

    /**
     * Returns all the issues assigned to the given user
     * 
     * @param {number} assignedToId   The user ID to look for
     */
    getIssuesByAsignee(assignedToId: number): Observable<Issue[]> {
        return this.http.get<Issue[]>(environment.apiUrl_REAL + "/api/issues/assignedto/" + assignedToId);
    }

    /**
     * Returns all the issues created by the given user
     *
     * @param {number} createdById  The user ID to look for
     */
    getIssuesByCreator(createdById: number): Observable<Issue[]> {
        return this.http.get<Issue[]>(environment.apiUrl_REAL + "/api/issues/createdby/" + createdById);
    }

    /**
     * Returns all the issues with a given status and user
     *
     * @param {{ userId?: number, statusId?: number }} [options]    The status ID and user ID to look for  
     */
    getIssuesByStatus(options?: { userId?: number, statusId?: number }): Observable<Issue[]> {
        return this.http.get<Issue[]>(environment.apiUrl_REAL + "/api/issues/status/" + options.statusId + "/user/" + options.userId);
    }

    /**
     * Returns all the statuses stored in the database
     */
    getIssueStatuses(): Observable<Status[]> {
        return this.http.get<Status[]>(environment.apiUrl_REAL + "/api/statuses/");
    }

    /**
     * Returns all the categories stored in the database
     */
    getIssueCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(environment.apiUrl_REAL + "/api/categories/");
    }

    /**
     * Returns all the priorities stored in the database
     */
    getIssuePriorities(): Observable<Priority[]> {
        return this.http.get<Priority[]>(environment.apiUrl_REAL + "/api/priorities/");
    }

    /**
     * Returns all the notes that were added to the given issue
     *
     * @param {number} issueId  The issue ID to look for
     */
    getIssueNotes(issueId: number): Observable<Note[]> {
        return this.http.get<Note[]>(environment.apiUrl_REAL + "/api/notes/issue/" + issueId);
    }

    /**
     * A POST or PUT request to add or update a given issue. If the issue passed on in the params has an ID then it's an update, otherwise it's a creation.
     *
     * @param {Issue} issue The issue to save
     */
    addOrUpdateIssue(issue: Issue): Observable<any> {
        if (issue.id) {
            return this.http.put<any>(environment.apiUrl_REAL + "/api/issues/", issue).pipe(map(issue => {
                return issue;
            }));
        }
        else {
            return this.http.post<any>(environment.apiUrl_REAL + "/api/issues/", issue).pipe(map(issue => {
                return issue;
            }));
        }
    }

    /**
     * A POST request to save a given note to the database
     *
     * @param {Note} note   The note to save
     */
    addStatusNote(note: Note): Observable<any> {
        return this.http.post<any>(environment.apiUrl_REAL + "/api/notes/", note).pipe(map(note => {
            return note;
        }));
    }
}

