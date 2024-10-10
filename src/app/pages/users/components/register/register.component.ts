import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

import { UsersService } from '../../../../services/users.service';
import { user } from '../../../../models/user';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
  ],
  providers: [
    UsersService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  public errorMessage: string = '';
  private subscription!: Subscription
  formMode!: string;
  user!: user;
  userForm!: FormGroup;
  validationMessages: { [key: string]: { [key: string]: string } };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    //private customValidator: CustomvalidationService

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
      },
      password: {
        required: 'Password é obrigatório',
        minlength: 'Deter ter ao menos 3 catacteres',
        maxlength: 'Deter ter no máximo 20 catacteres',
      },
      passwordConfirm: {
        required: 'Confirmação de Password é obrigatório',
        minlength: 'Dever ter ao menos 3 caracteres',
        maxlength: 'Deve ter no máximo 20 caracteres',
      }
    }

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formMode = 'new';
    this.userForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        email: ['', [Validators.email]],
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      }
      // {
      //   validator: this.matchPassword('password', 'passwordConfirm'),
      // }
    );

    this.subscription = this.route.paramMap.subscribe(
      params => {
        const newUser: user = {
          id: '', name: '', email: '', username: '', password: ''
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveUser(): void {

    if (this.userForm.valid) {

      if (this.userForm.dirty) {

        const newUser = { ...this.user, ...this.userForm.value };

        // METHOD POST
        this.userService.register(newUser).subscribe(
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

  matchPassword(password: string, passwordConfirm: string) {
    return (formGroup: FormGroup) => {
      if (password !== passwordConfirm)
        this.errorMessage = 'Senhas Não São iguais'
    }
  }

  onSaveComplete(): void {
    this.userForm.reset();
    this.router.navigate(['/']);
  }

  closeAlert() {
    this.errorMessage = '';
  }

}
