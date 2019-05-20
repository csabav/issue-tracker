import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user.type';
import { mergeMap, materialize, dematerialize, delay } from 'rxjs/operators';
import { Issue } from '../models/issue.type';
import { FakeDb } from './fake-db';
import * as _ from 'lodash';
import { Note } from '../models/note.type';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    fakeDb: any;

    constructor() {
        // localStorage.clear();
        this.load();
    }

    private load() {
        this.fakeDb = JSON.parse(localStorage.getItem('fakeDb')) || FakeDb;
        this.save();
    }

    private save() {
        localStorage.setItem("fakeDb", JSON.stringify(this.fakeDb));
        return of(delay(200));
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const authHeader = req.headers.get("Authorization");
        // const isLoggedIn = authHeader && authHeader.startsWith("Bearer fake-jwt-token");
        const isLoggedIn = true;

        return of(null).pipe(mergeMap(() => {
            console.log(req.url);

            // if (req.url.endsWith("/users/auth") && req.method === "POST") {
            //     const user = this.fakeDb.Users.find(u => u.username === req.body.username && u.password === req.body.password);

            //     if (!user) {
            //         return error('Username or password is incorrect');
            //     }

            //     return ok({
            //         id: user.id,
            //         email: user.email,
            //         username: user.username,
            //         firstName: user.firstName,
            //         lastName: user.lastName,
            //         userLevelId: user.userLevelId,
            //         token: "fake-jwt-token"
            //     });
            // }

            // if (req.url.endsWith("/issues/update/") && req.method === "POST") {
            //     if (!isLoggedIn) {
            //         return unauthorized();
            //     }

            //     let issue: Issue = req.body.issue;
            //     let updateSuccess = false;

            //     if (issue.id > 0) {
            //         // update existing issue
            //         for (let i = 0; i < this.fakeDb.Issues.length; i++) {
            //             if (this.fakeDb.Issues[i].id === issue.id) {
            //                 this.fakeDb.Issues[i] = issue;
            //                 updateSuccess = true;
            //                 this.save();
            //                 break;
            //             }
            //         }
            //     }
            //     else {
            //         // add new issue
            //         let maxIssue: Issue = _.maxBy(this.fakeDb.Issues, i => i.id);
            //         issue.id = ((maxIssue && maxIssue.id) || 0) + 1;

            //         this.fakeDb.Issues.push(issue);
            //         updateSuccess = true;
            //         this.save();
            //     }

            //     if (!updateSuccess) {
            //         return error("The issue you're trying to update doesn't exist");
            //     }

            //     return ok(issue);
            // }

            // if (req.url.endsWith("/notes/add/") && req.method === "POST") {
            //     if (!isLoggedIn) {
            //         return unauthorized();
            //     }

            //     let note: Note = req.body.note;
            //     let issue: Issue = _.find(this.fakeDb.Issues, i => i.id === note.issueId);

            //     if (!issue) {
            //         return error("The issue you're trying to update doesn't exist");
            //     }

            //     for (let i = 0; i < this.fakeDb.Issues.length; i++) {
            //         if (this.fakeDb.Issues[i].id === issue.id) {
            //             this.fakeDb.Issues[i].statusId = note.statusId;
            //             this.save();
            //             break;
            //         }
            //     }

            //     let maxNote: Note = _.maxBy(this.fakeDb.Notes, n => n.id);
            //     note.id = ((maxNote && maxNote.id) || 0) + 1;
            //     this.fakeDb.Notes.push(note);
            //     this.save();

            //     return ok(note);
            // }

            // if (req.url.endsWith("/users") && req.method === "GET") {
            //     // TODO: to properly do this we need an error interceptor
            //     if (!isLoggedIn) {
            //         return unauthorized();
            //     }

            //     let userResults = [];
            //     this.fakeDb.Users.forEach(user => {
            //         let userResult = {
            //             id: user.id,
            //             email: user.email,
            //             username: user.username,
            //             firstName: user.firstName,
            //             lastName: user.lastName,
            //             userLevelId: user.userLevelId
            //         }

            //         userResults.push(userResult);
            //     });

            //     return ok(userResults);
            // }

            // if (req.url.match(/\/notes\/issue\/(\d+)/) && req.method === "GET") {
            //     if (!isLoggedIn) {
            //         return unauthorized();
            //     }

            //     let urlParts = req.url.split('/');
            //     let id = +urlParts[urlParts.length - 1];

            //     return ok(_.orderBy(_.filter(this.fakeDb.Notes, n => n.issueId === id), ['id'], ['desc']));
            // }

            // if (req.url.endsWith("/issues") && req.method === "GET") {
            //     if (!isLoggedIn) {
            //         return unauthorized();
            //     }

            //     return ok(this.fakeDb.Issues);
            // }

            // if (req.url.match(/\/issue\/\d+/) && req.method === "GET") {
            //     if (!isLoggedIn) {
            //         return unauthorized();
            //     }

            //     let urlParts = req.url.split('/');
            //     let id = parseInt(urlParts[urlParts.length - 1]);

            //     return ok(_.find(this.fakeDb.Issues, i => i.id === id));
            // }

            // if (req.url.match(/\/issues\/assignedto\/\d+/) && req.method === "GET") {
            //     if (!isLoggedIn) {
            //         return unauthorized();
            //     }

            //     let urlParts = req.url.split('/');
            //     let id = parseInt(urlParts[urlParts.length - 1]);

            //     return ok(_.filter(this.fakeDb.Issues, i => i.assignedToId === id));
            // }

            // if (req.url.match(/\/issues\/createdby\/\d+/) && req.method === "GET") {
            //     if (!isLoggedIn) {
            //         return unauthorized();
            //     }

            //     let urlParts = req.url.split('/');
            //     let id = parseInt(urlParts[urlParts.length - 1]);

            //     return ok(_.filter(this.fakeDb.Issues, i => i.createdById === id));
            // }

            // if (req.url.match(/\/issues\/status\/(\d+)\/user\/(\d+)/) && req.method === "GET") {

            //     if (!isLoggedIn) {
            //         return unauthorized();
            //     }

            //     let urlParts = req.url.split('/');
            //     let statusId = parseInt(urlParts[urlParts.length - 3]);
            //     let userId = parseInt(urlParts[urlParts.length - 1]);

            //     return ok(_.filter(this.fakeDb.Issues, i => i.statusId === statusId && (i.assignedToId === userId || i.createdById === userId)));
            // }

            // if (req.url.endsWith("/statuses/") && req.method === "GET") {
            //     if (!isLoggedIn) {
            //         return unauthorized();
            //     }

            //     return ok(this.fakeDb.Statuses);
            // }

            // if (req.url.endsWith("/categories/") && req.method === "GET") {
            //     if (!isLoggedIn) {
            //         return unauthorized();
            //     }

            //     return ok(this.fakeDb.Categories);
            // }

            // if (req.url.endsWith("/priorities/") && req.method === "GET") {
            //     if (!isLoggedIn) {
            //         return unauthorized();
            //     }

            //     return ok(_.orderBy(this.fakeDb.Priorities, ['delay'], ['asc']));
            // }

            return next.handle(req);
        }))
            .pipe(materialize())
            .pipe(delay(200))
            .pipe(dematerialize());

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, message: 'Unauthorized' });
        }

        function error(message) {
            return throwError({ status: 400, message: message });
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};