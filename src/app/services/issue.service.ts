import { Injectable } from "@angular/core";
import { from, timer, of } from "rxjs";
import { delay } from "rxjs/operators";
import * as _ from "lodash";

import { Issue } from "../models/issue.type";
import { Status } from '../models/status.type';

@Injectable({
    providedIn: "root"
})
export class IssueService {
    private issues: Issue[];
    private statuses: Status[];

    constructor() {
        this.load();
    }

    private save() {
        localStorage.setItem('issues', JSON.stringify(this.issues));
        localStorage.setItem('statuses', JSON.stringify(this.statuses));
        // timer(200);
    }

    private load() {
        localStorage.clear();        
        
        this.issues = JSON.parse(localStorage.getItem('issues')) || [
            { id: 1,  createdOn: new Date("2019-05-01"), title: "In CTR (Click through ratio) ‘Total’ row calculation is wrong", description: "1) Go to page: (Provide URL of page where bug occurs)\n2) Click on ‘Publisher stats’ link to view publisher’s revenue detail stats date wise.\n3) On page (Provide URL of page where bug occurs) check CTR value in ‘Total’ row of CTR stats table.\n\nActual result: Calculation of ‘Total’ row in CTR table is wrong. Also Individual row CTR for each publisher is not truncated to 2 digits after decimal point. It’s showing CTR like 0.042556767.\n\nExpected result: Total CTR= (Total clicks/Total searches)*100\n\nPlease fix the bug", assignedToID: 2, createdByID: 1, statusID: 1, resolutionID: null, categoryID: 1, dueOn: new Date("2019-06-01")},
            { id: 2,  createdOn: new Date("2019-05-05"), title: "Application crash on clicking the SAVE button while creating a new user", description: "Application crash on clicking the SAVE button while creating a new user, hence unable to create a new user in the application.\n\nSteps To Reproduce:\n1) Logon into the application\n2) Navigate to the Users Menu > New User\n3) Filled all the fields\n4) Clicked on ‘Save’ button\n5) Seen an error page “ORA1090 Exception: Insert values Error…”\n6) See the attached logs for more information\n7) And also see the attached screenshot of the error page.\n\nExpected: On clicking SAVE button should be prompted to a success message “New User has been created successfully”.", assignedToID: 2, createdByID: 1, statusID: 3, resolutionID: null, categoryID: 1, dueOn: new Date("2019-06-01")}
        ];

        this.statuses = JSON.parse(localStorage.getItem('statuses')) || [
            { id: 1, name: "Created" },
            { id: 2, name: "In Progress" },
            { id: 3, name: "Closed" }
        ];

        this.save();
    }

    getAllIssues(){
        return of(this.issues).pipe(delay(200));
    }
    
    getSingleIssue(id: number){
        return of(_.find(this.issues, i => i.id === id)).pipe(delay(200));
    }

    getIssuesByAsignee(options?: {assignedToID?: number}){
        return of(_.filter(this.issues, i => options.assignedToID && i.assignedToID === options.assignedToID)).pipe(delay(200));
    }

    getIssuesByCreator(options?: {createdByID?: number}){
        return of(_.filter(this.issues, i => options.createdByID && i.createdByID === options.createdByID)).pipe(delay(200));
    }

    getIssuesByStatus(options?: {userID?: number, statusID?: number}){
        return of(_.filter(this.issues, i => options.statusID && i.statusID === options.statusID && options.userID && (i.assignedToID === options.userID || i.createdByID === options.userID ))).pipe(delay(200));
    }

    getIssueStatuses(){
        return of(this.statuses).pipe(delay(200));
    }
}

