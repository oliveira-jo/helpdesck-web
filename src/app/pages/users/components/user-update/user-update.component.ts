import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

import { UsersService } from '../../../../services/users.service';
import { user } from '../../../../models/user';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
  ],
  providers: [
    UsersService
  ],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit, OnDestroy {

  errorMessage: string = '';
  formMode!: string;
  user!: user;
  userForm!: FormGroup;
  private subscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {
  }

  ngOnInit() {
    this.formMode = 'new';
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });

    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id == null || id == '') {
          const newUser: user = { id: '', name: '', username: '', email: '', password: '', active: false }
          this.showUser(newUser);
        } else {
          this.getUser(id);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUser(id: string): void {

    this.userService.getUserById(id).subscribe(
      (user: user) => this.showUser(user),
      (error: any) => console.log('Error to search user ' + error.message),
    )
  }

  showUser(user: user): void {
    if (this.userForm) {
      this.userForm.reset();
    }
    this.user = user;

    this.userForm.patchValue({
      name: this.user.name,
      username: this.user.username,
      email: this.user.email,
    });
    console.log(this.user);

  }

  deleteUser(): void {
    if (this.user.id == '') {
      this.onSaveComplete();
    } else {
      if (confirm(`Tem certeza que deseja excluir o ticket: ${this.user.username} ?`)) {
        this.userService.delete(this.user.id!).subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
      }
    }
  }

  updateUser(): void {
    if (this.userForm.valid) {
      if (this.userForm.dirty) {

        // PUT METHOD
        const newUser = { ...this.user, ...this.userForm.value };
        this.userService.update(newUser).subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );

      } else {
        this.onSaveComplete();
      }
    }
  }

  navegateUserDetais() {
    this.router.navigate([`/user/${this.user.id}/details`]);
  }

  onSaveComplete(): void {
    this.userForm.reset();
    this.router.navigate([`/user/${this.user.id}/details`]);
  }

  closeAlert() {
    this.errorMessage = '';
  }

}
