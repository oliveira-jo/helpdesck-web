import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

import { user } from '../../../../models/user';
import { userPassword } from '../../../../models/userPassword';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-user-password-update',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './user-password-update.component.html',
  styleUrl: './user-password-update.component.css'
})
export class UserPasswordUpdateComponent implements OnInit {

  errorMessage: string = '';
  formMode!: string;
  user!: user;
  userPassword!: userPassword;
  userPasswordForm!: FormGroup;
  private subscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {
  }

  ngOnInit(): void {
    this.formMode = 'new';
    this.userPasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      newPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      newPasswordConfirm: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });

    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');

        if (id != null || id != '') {
          this.getUser(id!);
        }

      }
    );
  }

  getUser(id: string): void {
    this.userService.getUserById(id).subscribe(
      (user: user) => {
        this.user = user;
      },
      (error) => {
        console.log('- Error to search user ' + error.message)
      }
    )
  }

  updatePassword(): void {

    if (this.userPasswordForm.valid) {
      if (this.userPasswordForm.dirty) {

        if (this.userPasswordForm.get('newPassword')?.value === this.userPasswordForm.get('newPasswordConfirm')?.value) {

          // PUT PASSWORD METHOD
          const newUserPassword = { ...this.userPassword, ...this.userPasswordForm.value };
          newUserPassword.id = this.user.id;
          this.userService.updatePassword(newUserPassword).subscribe(
            () => {
              this.onSaveComplete();
            },
            () => this.errorMessage = 'Erro na senha atual!'
          );

        } else {
          this.errorMessage = 'Senhas não são iguais!';
        }

      } else {
        this.onSaveComplete();
      }
    }
  }

  navigateUserDetails() {
    this.router.navigate([`/user/${this.user.id}/details`]);
  }

  onSaveComplete(): void {
    this.userPasswordForm.reset();
    this.router.navigate([`/user/${this.user.id}/details`]);
  }

  closeAlert() {
    this.errorMessage = '';
  }

}
