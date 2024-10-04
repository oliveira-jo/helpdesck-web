
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

  login(username: string, password: string): Observable<LoginResponse> {
    const urlLogin = `${environment.baseUrl}/api/v1/auth/login`;
    return this.http.post<any>(urlLogin, { username, password })
      .pipe(
        tap((response) => {
          if (response.token === '') return;
          localStorage.setItem('token', btoa(JSON.stringify(response['accessToken'])));
          localStorage.setItem('username', btoa(JSON.stringify(response['username'])));
          //this.router.navigate(['/']);
        }),
        (catchError(this.handleError))
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  get getLoggedUser(): any {
    return localStorage.getItem('username')
      ? JSON.parse(atob(localStorage.getItem('username')!))
      : null;
  }

  get getUserToken(): any {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token')!))
      : null;
  }

  get userIsLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getUserAuth(): Observable<user> {
    return this.http.get<user>(`${environment.baseUrl}/api/v1/auth`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.urlApi + '/GetUsers')
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserById(id: string): Observable<user> {
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
