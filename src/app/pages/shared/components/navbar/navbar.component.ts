import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../../services/users.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit() {
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

}
