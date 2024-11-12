import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

import { UsersService } from '../../../../services/users.service';
import { user } from '../../../../models/user';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NgIf,
    NgFor,
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formMode = 'new';
    this.userForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      }
    );

    this.subscription = this.route.paramMap.subscribe(
      params => {
        const newUser: user = {
          id: '', name: '', email: '', username: '', password: '', active: false
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

        if (this.userForm.controls['password'].value === this.userForm.controls['passwordConfirm'].value) {
          const newUser = { ...this.user, ...this.userForm.value };
          // METHOD POST
          this.userService.register(newUser).subscribe(
            () => {

              if (confirm(`Usuário Cadastrado com Sucesso!`)) {
                this.onSaveComplete()
              }

            },
            (error: any) => {
              this.errorMessage = <any>error
              this.errorMessage = 'Erro ao Cadastrar Usuário, Tente Novamente!';
            }
          );

        } else {
          this.errorMessage = 'As senhas não são iguais!';
        }
      } else {
        this.onSaveComplete();
      }
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
