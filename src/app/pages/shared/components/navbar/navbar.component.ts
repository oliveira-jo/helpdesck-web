import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user: user | undefined;

  constructor(private userService: UsersService) {
    this.userService.getUserAuth().subscribe(
      (user: user) => this.user = user,
      (error: any) => console.log('Error when searching logged user')
    );
  }

  ngOnInit() {
    // this.getUser();
  }

  // getUser() {
  //   this.userService.getUserAuth().subscribe(
  //     (user: user) => this.user = user,
  //     (error: any) => console.log('Error when searching logged user')
  //   );
  // }

  getId() {
    return this.user?.id;
  }

  getName() {
    return this.user?.name;
  }

  getUsername() {
    return this.userService.getLoggedUser;
  }

  logout() {
    this.userService.logout();
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
