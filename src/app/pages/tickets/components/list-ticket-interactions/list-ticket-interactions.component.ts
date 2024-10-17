import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

import { TicketsService } from '../../../../services/tickets.service';
import { TicketInteraction } from '../../../../models/ticket-interaction';
import { TickerInteractionResponse } from '../../../../models/ticket-interaction-response';


@Component({
  selector: 'app-list-ticket-interactions',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgIf
  ],
  providers: [
    TicketsService
  ],
  templateUrl: './list-ticket-interactions.component.html',
  styleUrl: './list-ticket-interactions.component.css'
})
export class ListTicketInteractionsComponent implements OnInit {

  ticketInteractions: TickerInteractionResponse[] | undefined;
  ticketId!: string;
  errorMessage: string = '';
  private subscription!: Subscription;

  constructor(
    private ticketsService: TicketsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');

        if (id == null || id == '') {
          const t: TicketInteraction = {
            id: '', message: ''
          }
        } else {
          this.ticketId = id;
        }
      }
    );
    this.getTicketInteractions(this.ticketId);
  }

  getTicketInteractions(id: string) {
    this.ticketsService.getTicketInteractions(id).subscribe({
      next: tickerInteractionResponse => {

        console.log(tickerInteractionResponse);

        this.ticketInteractions = tickerInteractionResponse;
        console.log(this.ticketInteractions);

      },
      error: err => {
        console.log(' ** Erro: ', err.message);
        this.errorMessage = <any>err.message;
      },
      complete: () => {
        console.log('Finalizou Ticket Interactions List');
      }
    });
  }

}
