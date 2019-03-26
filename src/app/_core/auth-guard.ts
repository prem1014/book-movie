import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
    providedIn: 'root'
})

export class AppAuthGuard implements CanActivate {
    private user: any;
    constructor(private router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLogin(state.url);
    }

    private checkLogin(url: string): boolean {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        if(this.user && this.user.isAthenticated) {
            return true;
        } else {
            this.router.navigateByUrl('sign-in')      
        }
    }
}