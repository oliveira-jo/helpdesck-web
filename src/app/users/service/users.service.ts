import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { user } from '../model/user';
import { login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlApi = `${environment.baseUrl}/api/v1/users`;
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

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

  login(login: login): Observable<string> {

    const urlId = `${environment.baseUrl}/auth/login`;

    return this.http.post<string>(urlId, login)
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
