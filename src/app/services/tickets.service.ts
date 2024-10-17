import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { ticket } from '../models/ticket';
import { StatusResponse } from '../models/status-response.type';
import { TicketInteraction } from '../models/ticket-interaction';
import { TickerInteractionResponse } from '../models/ticket-interaction-response';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private urlApi = `${environment.baseUrl}/api/v1/tickets`;
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  public status: StatusResponse;

  constructor(private http: HttpClient) {
    this.status = this.numberStatusOfTickets();
  }

  numberStatusOfTickets(): any {
    return this.http.get<StatusResponse>(this.urlApi + '/numberOfStatus', { headers: this.jsonHeaders }) //add header
      .subscribe({
        next: StatusResponse => {
          this.status = StatusResponse;
        },
        error: err => {
          console.error('Observable emitted an error: ' + err);
        },
        complete: () => {
          console.log('** Observable emitted the complete notification **');
        }
      });
  }

  getTickets(): Observable<ticket[]> {
    return this.http.get<ticket[]>(this.urlApi, { headers: this.jsonHeaders }) //add header
      .pipe(
        catchError(this.handleError)
      );
  }

  getTicketInteractions(ticketId: string): Observable<TickerInteractionResponse[]> {
    const urlInteraction = `${this.urlApi}/${ticketId}/interactions`;
    return this.http.get<TickerInteractionResponse[]>(urlInteraction, { headers: this.jsonHeaders }) //add header
      .pipe(
        catchError(this.handleError)
      );
  }

  getTicket(id: string): Observable<ticket> {
    if (id === '') {
      return of(this.initTicket());
    }
    const urlId = `${this.urlApi}/${id}`;
    return this.http.get<ticket>(urlId, { headers: this.jsonHeaders }) // add header
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

  createTicketInteraction(ticketId: string, tiecktInteraction: TicketInteraction) {
    const urlInteraction = `${this.urlApi}/${ticketId}/interaction`;
    return this.http.post<TicketInteraction>(urlInteraction, tiecktInteraction, { headers: this.jsonHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  update(ticket: ticket) {
    const urlId = `${this.urlApi}/${ticket.id}`;
    return this.http.put<ticket>(urlId, ticket, { headers: this.jsonHeaders }) //add header
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
      console.log(`* Error * : ${e.error.message}`);
      msgErro = `* Error * : ${e.error.message}`;
    } else {
      msgErro = `* Error API. * StatusCode* : ${e.status}, Desc.: ${e.body.error}`;
      console.log(`* Error API. * StatusCode* : ${e.status}, Desc.: ${e.body.error}`);
    }
    return throwError(msgErro);
  }

  private initTicket(): ticket {
    return {
      id: null,
      subject: null,
      description: null,
      attachment: null,
      createdBy: null,
      supportUser: null,
      createdAt: null,
      status: null,
      updatedBy: null,
      updateAt: null
    }
  }

}
