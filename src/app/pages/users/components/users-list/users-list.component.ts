
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { user } from '../../../../models/user';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users: user[] | undefined;
  errorMessage: string = '';

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
      },
      error => this.errorMessage = <any>error
    );
  }

  deleteUser(id: string): void {
    if (id == '') {
      this.onSaveComplete();
    } else {
      if (confirm(`Tem certeza que deseja excluir o User: ?`)) {
        this.userService.delete(id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  onSaveComplete() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
      },
      error => this.errorMessage = <any>error
    );
  }

  navegatiToNewUser() {
    this.router.navigate(['/user/register']);
  }

}
