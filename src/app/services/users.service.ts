
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

import { user } from '../models/user';
import { NumberOfUsersResponse } from '../models/numberOfUsers-response.type';
import { userPassword } from '../models/userPassword';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlApi = `${environment.baseUrl}/api/v1/users`;
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  public numberUsers: NumberOfUsersResponse;

  constructor(private http: HttpClient, private router: Router) {
    this.numberUsers = this.numberOfUsers();

  }

  numberOfUsers(): any {
    return this.http.get<NumberOfUsersResponse>(this.urlApi + '/numberOfUsers', { headers: this.jsonHeaders })
      .subscribe({
        next: NumberOfUsersResponse => {
          this.numberUsers = NumberOfUsersResponse;
        },
        error: err => {
          console.error('Observable emitted an error: ' + err);
        },
        complete: () => {
          //console.log('** Observable emitted the complete notification **');
        }
      });
  }

  getAllUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.urlApi + '/GetUsers', { headers: this.jsonHeaders })
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

  updatePassword(userPassword: userPassword) {
    const urlId = `${this.urlApi}/updatePassword/${userPassword.id}`;
    return this.http.put<user>(urlId, userPassword, { headers: this.jsonHeaders })
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
      email: null,
      active: false
    }
  }
}
