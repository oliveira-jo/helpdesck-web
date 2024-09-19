import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ticket } from '../models/ticket';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private urlApi = `${environment.baseUrl}/api/v1/tickets`;

  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getTickets(): Observable<ticket[]> {
    return this.http.get<ticket[]>(this.urlApi)
      .pipe(
        catchError(this.handleError)
      );
  }

  // getTickets2(): Observable<ticket[]> {
  //   const response = this.http.get<ticket[]>(this.urlApi);
  //   const resultPipe = response.pipe(
  //       catchError(this.handleError)
  //     );
  //   return resultPipe;
  // }

  getTicket(id: string): Observable<ticket> {

    if (id === '') {
      return of(this.initTicket());
    }

    const urlId = `${this.urlApi}/${id}`;
    return this.http.get<ticket>(urlId)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(ticket: ticket) {
    return this.http.post<ticket>(this.urlApi, ticket, { headers: this.jsonHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  update(ticket: ticket) {
    const urlId = `${this.urlApi}/${ticket.id}`;
    return this.http.put<ticket>(urlId, ticket, { headers: this.jsonHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: string) {
    const urlId = `${this.urlApi}/${id}`;
    return this.http.delete<ticket>(urlId, { headers: this.jsonHeaders })
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

  private initTicket(): ticket {
    return {
      id: null,
      subject: null,
      description: null,
      attachment: null
    }
  }

}
