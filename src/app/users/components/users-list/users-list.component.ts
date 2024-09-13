import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getTestBed } from '@angular/core/testing';

import { user } from '../../model/user';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users: user[] | undefined;
  errorMessage: string = '';

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(
      tickets => {
        this.users = this.users;
      },
      error => this.errorMessage = <any>error
    );

  }

}
