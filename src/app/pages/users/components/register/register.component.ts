import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { user } from '../../../../models/user';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-ticket-creation',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  errorMessage: string = '';
  pageTitle: string = 'Cadastrar Usuário';
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
      username: {
        required: 'Username é obrigatório',
        minlength: 'Dever ter ao menos 3 catacteres',
        maxlength: 'Dever ter no máximo 20 catacteres',
      },
      password: {
        required: 'Password é obrigatório',
        minlength: 'Dever ter ao menos 6 catacteres',
      },
      name: {
        required: 'Nome completo é obrigatório',
        minlength: 'Dever ter ao menos 4 catacteres',
        maxlength: 'Dever ter no máximo 20 catacteres',
      },
      email: {
        required: 'Email é obrigatório',
      }
    }

  }

  ngOnInit() {

    this.formMode = 'new';

    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required]]
    });

    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');

        if (id == null || id == '') {
          const newUser: user = {
            id: '', username: '', password: '', name: '', email: ''
          }
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
    this.userService.getUser(id).subscribe(
      (user: user) => this.showUser(user),
      (error: any) => this.errorMessage = <any>error

    )
  }

  showUser(user: user): void {

    if (this.userForm) {
      this.userForm.reset();
    }

    this.user = user;

    if (this.user.id == '') {
      this.pageTitle = 'Adicionar Usuário';
    } else {
      this.pageTitle = `Editar Usuário`;
    }

    this.userForm.patchValue({
      username: this.user.username,
      password: this.user.password,
      name: this.user.name,
      email: this.user.email,
    });

  }

  deleteUser(): void {
    if (this.user.id == '') {
      this.onSaveComplete();
    } else {
      if (confirm(`Tem certeza que deseja excluir o usuário: ${this.user.username} ?`)) {
        this.userService.delete(this.user.id!).subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
      }
    }
  }

  saveUser(): void {

    if (this.userForm.valid) {

      if (this.userForm.dirty) {

        const newUser = { ...this.user, ...this.userForm.value };

        if (newUser.id === '') {
          this.userService.register(newUser).subscribe( // POST
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
        } else {
          this.userService.update(newUser).subscribe( // PUT
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
        }

      } else {
        this.onSaveComplete();
      }

    } else {
      this.errorMessage = 'Por favor, corrija os erros de validação.';
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
