import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class nonAuthUserGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private router: Router) { }

  canActivate() {

    if (this.userService.userIsLogged) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}