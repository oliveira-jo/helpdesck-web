import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../../services/users.service';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { user } from '../../../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user!: user | any;

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.user = this.userService.getLoggedUser;
  }

  logout() {
    this.userService.logout();
  }

  getUsername() {
    return this.userService.getLoggedUser;
  }

  isLogged() {
    return this.userService.userIsLogged;
  }

  isAdminLogged() {
    if (this.getUsername() == 'admin')
      return true;
    else
      return false;
  }

}
