import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { RouterLink } from '@angular/router';
import { TicketsListComponent } from "../../../tickets/components/tickets-list/tickets-list.component";

import { UsersService } from '../../../../services/users.service';
import { TicketsService } from '../../../../services/tickets.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TicketsListComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(
    private ticketService: TicketsService,
    private usersService: UsersService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  // TICKETS NUMBERS
  openTickets() {
    return this.ticketService.status.nOpenTickets;
  }

  inProgressTickets() {
    return this.ticketService.status.nInProgressTickets;
  }

  awaitingTickets() {
    return this.ticketService.status.nAwaitingCustomerTickets;
  }

  resolvedTickets() {
    return this.ticketService.status.nResolverdTickets;
  }

  cancelledTickets() {
    return this.ticketService.status.nCancelledTickets;
  }

  // USERS NUMBERS
  totalOfAdmin() {
    return this.usersService.numberUsers.nAdmins;
  }

  totalOfAttendent() {
    return this.usersService.numberUsers.nAttendents;
  }

  totalOfDefaultUsers() {
    return this.usersService.numberUsers.nDefaultUsers;
  }

  isLoggedAdmin() {
    if (this.authService.getLoggedUser == 'admin') {
      return true;
    } else {
      return false;
    }
  }

}


