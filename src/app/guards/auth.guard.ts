import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * The authentication guard, which is responsible for shutting out unauthorized requests to the application
 */
@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService){}

    /**
     * Reuturns a boolean value, which shows if the requested page can be displayed or not.
     * Also navigates to the login page if it catches an unauthorized request
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authService.currentUserValue;
        
        if(currentUser){
            // all good, logged in
            return true;
        }

        this.router.navigate(["/login"], {queryParams: {returnUrl: state.url}});
        return false;
    }
}