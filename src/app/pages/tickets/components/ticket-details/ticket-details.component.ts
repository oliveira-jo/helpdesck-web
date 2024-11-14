import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ticket } from '../../../../models/ticket';
import { TicketsService } from '../../../../services/tickets.service';
import { TicketInteractionComponent } from "../ticket-interaction/ticket-interaction.component";
import { ListTicketInteractionsComponent } from "../list-ticket-interactions/list-ticket-interactions.component";
import { UsersService } from '../../../../services/users.service';
import { user } from '../../../../models/user';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TicketInteractionComponent,
    ListTicketInteractionsComponent
  ],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent implements OnInit {

  errorMessage: string = '';
  ticket!: ticket;
  private subscription!: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketsService,

  ) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id == null || id == '') {
          this.router.navigate(['/tickets'])
        } else {
          this.getTicket(id);
        }
      }
    );
  }

  getTicket(id: string): void {
    this.ticketService.getTicket(id).subscribe(
      (ticket: ticket) => {
        this.ticket = ticket
      },
      (error: any) => this.errorMessage = <any>error
    )
  }

  deleteTicket(): void {
    if (this.ticket.id == '') {
      this.errorMessage = 'Erro ao tentar deletar ticket!';
    } else {
      if (confirm(`Tem certeza que deseja excluir o ticket: ${this.ticket.subject} ?`)) {
        this.ticketService.delete(this.ticket.id!).subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
      }
    }
  }

  onSaveComplete(): void {
    this.router.navigate(['/tickets']);
  }

  closeAlert() {
    this.errorMessage = '';
  }

}
