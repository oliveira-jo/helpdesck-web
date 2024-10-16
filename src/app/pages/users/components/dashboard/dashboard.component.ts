import { Component, OnInit } from '@angular/core';

import { TicketsListComponent } from "../../../tickets/components/tickets-list/tickets-list.component";
import { TicketsService } from '../../../../services/tickets.service';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TicketsListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private ticketService: TicketsService, private usersService: UsersService) {
  }

  ngOnInit(): void {
  }

  // TICKETS NUMBERS
  openTickets() {
    return this.ticketService.status.nOpenTickets; //success 
  }

  inProgressTickets() {
    return this.ticketService.status.nInProgressTickets; //danger
  }

  awaitingTickets() {
    return this.ticketService.status.nAwaitingCustomerTickets; //warning
  }

  resolvedTickets() {
    return this.ticketService.status.nResolverdTickets; //primary
  }

  cancelledTickets() {
    return this.ticketService.status.nCancelledTickets; //secondaty
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


}


