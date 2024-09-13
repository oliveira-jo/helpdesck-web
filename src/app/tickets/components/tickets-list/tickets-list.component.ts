import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getTestBed } from '@angular/core/testing';

import { ticket } from '../../model/ticket';
import { TicketsService } from '../../service/tickets.service';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [
    CommonModule
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

}
