import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authUserGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private router: Router) { }

  canActivate() {
    if (this.usersService.userIsLogged) {
      return true;
    }
    this.router.navigate(['/user/login']);
    return false;
  }
}