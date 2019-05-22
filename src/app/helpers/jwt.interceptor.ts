import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * An HttpInterceptor to always add the auth token to the request header
 * This way we can easily use the API's functions
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.authService.currentUserValue;

        if(currentUser && currentUser.token) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + currentUser.token
                }
            });
        }
        
        return next.handle(req);
    }

}

export let jwtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
}