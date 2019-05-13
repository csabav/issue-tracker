import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user.type';
import { mergeMap, materialize, dematerialize, delay } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const users: User[] = [
            { id: 1, email: "admintester@issuetracker.com", username: "admin", password: "admin", firstName: "Admin", lastName: "Tester", userLevelID: 1 },
            { id: 2, email: "tester@issuetracker.com", username: "test", password: "test", firstName: "Test", lastName: "Tester", userLevelID: 2 }
        ];

        const authHeader = req.headers.get("Authorization");
        const isLoggedIn = authHeader && authHeader.startsWith("Bearer fake-jwt-token");

        return of(null).pipe(mergeMap(() => {
            if (req.url.endsWith("/users/auth") && req.method === "POST") {
                const user = users.find(u => u.username === req.body.username && u.password === req.body.password);

                if (!user) {
                    return error('Username or password is incorrect');
                }

                return ok({
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userLevelID: user.userLevelID,
                    token: "fake-jwt-token"
                });
            }

            if (req.url.endsWith("/users") && req.method === "GET") {
                if (!isLoggedIn) {
                    return unauthorized();
                }

                let userResults = [];
                users.forEach(user => {
                    let userResult = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userLevelID: user.userLevelID
                    }

                    userResults.push(userResult);
                });

                return ok(userResults);
            }

            return next.handle(req);
        }))
            .pipe(materialize())
            .pipe(delay(500))
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