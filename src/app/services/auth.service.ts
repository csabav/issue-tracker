import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.type';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

/**
 * A service to execute the authentication related tasks and communication with the API
 */
@Injectable({
    providedIn: "root"
})
export class AuthService {
    /**
     * A private subject that represents the currently logged in user
     */
    private currentUserSubject: BehaviorSubject<User>;

    /**
     * The currently logged in user as an Observable
     */
    currentUser: Observable<User>;

    /**
     * Tries to set the current user by retrieving it from the session storage
     */
    constructor(private http: HttpClient){
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem("currentUser")));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * Get the current logged in user
     */
    get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /**
     * Executes a POST request to authenticate the given credentials.
     * If the process is successful it saves the current user to the session storage
     *
     * @param {string} username
     * @param {string} password
     */
    login(username: string, password: string){
        return this.http.post<any>(environment.apiUrl_REAL + "/api/users/authenticate", {username, password}).pipe(map(user => {
            if(user && user.token){
                sessionStorage.setItem("currentUser", JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
    }

    /**
     * Logs out the current user by removing it from the session storage
     */
    logout(){
        sessionStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);
    }
}