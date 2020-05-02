import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ClientStorage } from '../shared/client-storage';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = ClientStorage.getUser();
    if (user && user.AuthToken) {
      // TODO: Actually check the auth token contents...
      return true;
    }

    this.router.navigate(['signin']);
    return false;
  }
}