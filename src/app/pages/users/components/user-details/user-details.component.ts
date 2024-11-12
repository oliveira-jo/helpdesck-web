import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListTicketInteractionsComponent } from '../../../tickets/components/list-ticket-interactions/list-ticket-interactions.component';
import { TicketInteractionComponent } from '../../../tickets/components/ticket-interaction/ticket-interaction.component';

import { user } from '../../../../models/user';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TicketInteractionComponent,
    ListTicketInteractionsComponent

  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  errorMessage: string = '';
  user!: user;
  private subscription!: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id == null || id == '') {
          this.router.navigate(['/'])
        } else {
          this.getUser(id);
        }
      }
    );
  }

  getUser(id: string): void {
    this.userService.getUserById(id).subscribe(
      (user: user) => this.user = user,
      (error: any) => this.errorMessage = <any>error
    )
  }

  closeAlert() {
    this.errorMessage = '';
  }
}

