import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

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

  isAdminLogged() {
    if (this.authService.getLoggedUser == 'admin')
      return true;
    else
      return false;
  }

}
