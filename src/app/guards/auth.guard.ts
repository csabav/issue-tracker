import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currentUser = this.authService.currentUserValue;
        
        if(currentUser){
            // all good, logged in
            return true;
        }

        this.router.navigate(["/login"], {queryParams: {returnUrl: state.url}});
        return false;
    }
}