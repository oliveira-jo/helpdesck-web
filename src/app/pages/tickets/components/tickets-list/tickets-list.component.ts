import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getTestBed } from '@angular/core/testing';

import { TicketsService } from '../../../../services/tickets.service';
import { RouterLink } from '@angular/router';
import { ticket } from '../../../../models/ticket';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent implements OnInit {

  tickets: ticket[] | undefined;
  errorMessage: string = '';

  constructor(private ticketsService: TicketsService) { }

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets() {
    this.ticketsService.getTickets().subscribe(
      tickets => {
        this.tickets = tickets;
      },
      error => this.errorMessage = <any>error
    );
  }

  deleteTicket(id: string): void {
    if (id == '') {
      this.onSaveComplete();
    } else {
      if (confirm(`Tem certeza que deseja excluir o ticket: ?`)) {
        this.ticketsService.delete(id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  onSaveComplete() {
    this.ticketsService.getTickets().subscribe(
      tickets => {
        this.tickets = tickets;
      },
      error => this.errorMessage = <any>error
    );
  }

}
