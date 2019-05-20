import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.type';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    currentUser: Observable<User>;

    constructor(private http: HttpClient){
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem("currentUser")));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string){
        return this.http.post<any>(environment.apiUrl_REAL + "/api/users/authenticate", {username, password}).pipe(map(user => {
            if(user && user.token){
                sessionStorage.setItem("currentUser", JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
    }

    logout(){
        sessionStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);
    }
}