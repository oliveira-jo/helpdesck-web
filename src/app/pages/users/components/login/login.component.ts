import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UsersService } from '../../../../services/users.service';
import { user } from '../../../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  providers: [
    UsersService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  public errorMessage: string = '';
  loginForm!: FormGroup;
  pageTitle: string = 'Login';
  formMode!: string;
  user!: user;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      //email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    });
  }

  login() {

    if (this.loginForm.invalid) return;
    this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: () => { this.router.navigate(['/tickets']) },
      error: () => {
        console.log("error" + this.errorMessage),
          this.errorMessage = 'Erro ao fazer o login!'
      }
    })

  }

  closeAlert() {
    this.errorMessage = '';
  }

}
