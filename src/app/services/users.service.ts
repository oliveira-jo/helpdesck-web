
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

import { user } from '../models/user';
import { LoginResponse } from '../models/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlApi = `${environment.baseUrl}/api/v1/users`;
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }




  // **************************************************************************************
  // estudar a questão de obter o token da session para poder passar nas outras
  // requisições


  login(username: string, password: string): Observable<LoginResponse> {

    const urlLogin = `${environment.baseUrl}/api/v1/auth/login`;

    return this.http.post<LoginResponse>(urlLogin, { username, password })
      .pipe(
        tap((response) => {

          // *************************************************************** ??
          if (response.token === '') return;

          localStorage.setItem('token', btoa(JSON.stringify(response['token'])));
          localStorage.setItem('username', btoa(JSON.stringify(response['username'])));

          this.router.navigate(['/']);

          // *************************************************************** ??
          //console.log(localStorage.getItem('token')) 
        }),
        (catchError(this.handleError))
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/users/login']);
  }

  get getLoggedUser(): user {
    return localStorage.getItem('username')
      ? JSON.parse(atob(localStorage.getItem('username')!))
      : null;
  }

  get getIdUserLogged(): string | null | undefined {
    return localStorage.getItem('username')
      ? (JSON.parse(atob(localStorage.getItem('user')!)) as user).id
      : null;
  }

  get getToken(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token')!))
      : null;
  }

  get userIsLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  // ******************************************************************
  // ******************************************************************

  getUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.urlApi)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUser(id: string): Observable<user> {

    if (id === '') {
      return of(this.initUser());
    }

    const urlId = `${this.urlApi}/${id}`;

    return this.http.get<user>(urlId)
      .pipe(
        catchError(this.handleError)
      );
  }

  register(user: user) {
    return this.http.post<user>(`${this.urlApi}/register`, user, { headers: this.jsonHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  update(user: user) {
    const urlId = `${this.urlApi}/${user.id}`;
    return this.http.put<user>(urlId, user, { headers: this.jsonHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: string) {
    const urlId = `${this.urlApi}/${id}`;
    return this.http.delete<user>(urlId, { headers: this.jsonHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(e: { error: { message: any; }; status: any; body: { error: any; }; }) {
    let msgErro: string;
    if (e.error instanceof ErrorEvent) {
      msgErro = `* Error * : ${e.error.message}`;
    } else {
      msgErro = `* Error API. * StatusCode* : ${e.status}, Desc.: ${e.body.error}`;
    }
    return throwError(msgErro);
  }

  private initUser(): user {
    return {
      id: null,
      username: null,
      password: null,
      name: null,
      email: null
    }
  }
}