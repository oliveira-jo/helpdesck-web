
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlApi = `${environment.baseUrl}/api/v1/users`;
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {

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
