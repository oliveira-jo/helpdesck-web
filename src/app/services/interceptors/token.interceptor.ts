
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class tokenInterceptor implements HttpInterceptor {

  constructor(private userService: UsersService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const token = this.userService.getUserToken;
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.baseUrl.split('/');


    if (token && requestUrl[2] === apiUrl[2]) {

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          token: `${token}`
        }
      });

      return next.handle(request).pipe(catchError(

        error => {
          this.userService.logout();
          return throwError(error);
        }

      ));
    }
    else {
      return next.handle(request);
    }
  }
}