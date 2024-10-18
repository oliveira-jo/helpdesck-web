import { Routes } from '@angular/router';
import { TicketsListComponent } from './pages/tickets/components/tickets-list/tickets-list.component';
import { HomeComponent } from './pages/shared/components/home/home.component';
import { TicketCreationComponent } from './pages/tickets/components/ticket-creation/ticket-creation.component';
import { LoginComponent } from './pages/users/components/login/login.component';
import { RegisterComponent } from './pages/users/components/register/register.component';
import { UsersListComponent } from './pages/users/components/users-list/users-list.component';
import { authUserGuard } from './services/guards/auth-user.guard';
import { TicketUpdateComponent } from './pages/tickets/components/ticket-update/ticket-update.component';
import { UserUpdateComponent } from './pages/users/components/user-update/user-update.component';
import { DashboardComponent } from './pages/users/components/dashboard/dashboard.component';
import { TicketDetailsComponent } from './pages/tickets/components/ticket-details/ticket-details.component';
import { TicketInteractionComponent } from './pages/tickets/components/ticket-interaction/ticket-interaction.component';
import { ListTicketInteractionsComponent } from './pages/tickets/components/list-ticket-interactions/list-ticket-interactions.component';

export const routes: Routes = [

  // Non Auth User - canActivate: [nonAuthUserGuard]
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },

  // Just for User Auth
  { path: 'users/dashbord', component: DashboardComponent, canActivate: [authUserGuard] },
  { path: 'users', component: UsersListComponent, canActivate: [authUserGuard] },
  { path: 'user/:id/update', component: UserUpdateComponent, canActivate: [authUserGuard] },
  { path: 'tickets', component: TicketsListComponent, canActivate: [authUserGuard] },
  { path: 'tickets/create', component: TicketCreationComponent, canActivate: [authUserGuard] },
  { path: 'tickets/:id/update', component: TicketUpdateComponent, canActivate: [authUserGuard] },
  { path: 'tickets/:id/details', component: TicketDetailsComponent, canActivate: [authUserGuard] },
  { path: 'tickets/:id/interaction/create', component: TicketInteractionComponent, canActivate: [authUserGuard] },
  { path: 'tickets/:id/interactions', component: ListTicketInteractionsComponent, canActivate: [authUserGuard] },
];