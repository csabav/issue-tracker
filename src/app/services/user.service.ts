import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { User } from '../models/user.type';

/**
 * A servie for communicating between the API and the {@link User} objects
 */
@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private http: HttpClient) { }

    /**
     * Returns all the users stored in the database
     */
    getAll(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiUrl_REAL + "/api/users");
    }
}