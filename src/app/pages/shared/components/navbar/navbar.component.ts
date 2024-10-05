import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../../../../services/users.service';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { user } from '../../../../models/user';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
  ],
  providers: [
    AuthService
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user: user | undefined;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
  }

  getId() {
    return this.authService.getIdLoggedUser;
  }

  getUsername() {
    return this.authService.getLoggedUser;
  }

  logout() {
    this.authService.logout();
  }

  isLogged() {
    return this.authService.userIsLogged;
  }

  navigateUserUpdate() {
    this.router.navigate([`/user/${this.getId()}/update`]);
  }

  navigateToNewUser() {
    this.router.navigate(['/users/register']);
  }

  navigateToTickets() {
    this.router.navigate(['/tickets']);
  }

  isAdminLogged() {
    if (this.getUsername() == 'admin')
      return true;
    else
      return false;
  }

}
