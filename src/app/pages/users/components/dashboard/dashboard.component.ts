import { Component } from '@angular/core';
import { TicketsListComponent } from "../../../tickets/components/tickets-list/tickets-list.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TicketsListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
