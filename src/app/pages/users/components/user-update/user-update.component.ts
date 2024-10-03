import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { user } from '../../../../models/user';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,

  ],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit, OnDestroy {

  errorMessage: string = '';
  formMode!: string;
  user!: user;
  userForm!: FormGroup;
  validationMessages: { [key: string]: { [key: string]: string } };
  private subscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService

  ) {
    this.validationMessages = {
      name: {
        required: 'Name é obrigatório',
        minlength: 'Deter ter ao menos 3 catacteres',
        maxlength: 'Deter ter no máximo 50 catacteres',
      },
      email: {
        required: 'é obrigatório',
        email: 'Formato email é obrigatório',
      },
      username: {
        required: 'Username é obrigatório',
        minlength: 'Deter ter ao menos 3 catacteres',
        maxlength: 'Deter ter no máximo 50 catacteres',
      }
    }

  }

  ngOnInit() {

    this.formMode = 'new';
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });

    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');

        if (id == null || id == '') {
          const newUser: user = { id: '', name: '', username: '', email: '', password: '' }
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
      (error: any) => this.errorMessage = <any>error
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
    } else {
      this.errorMessage = 'Por favor, corrija os erros de validação.';
    }
  }

  navigate() {
    this.router.navigate(['/home']);
  }

  onSaveComplete(): void {
    this.userForm.reset();
    this.router.navigate(['/users']);
  }

  closeAlert() {
    this.errorMessage = '';
  }

}
