import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TicketsListComponent } from './tickets/components/tickets-list/tickets-list.component';
import { HomeComponent } from './shared/components/home/home.component';
import { TicketCreationComponent } from './tickets/components/ticket-creation/ticket-creation.component';
import { RegisterComponent } from './users/components/register/register.component';
import { LoginComponent } from './users/components/login/login.component';
import { UsersListComponent } from './users/components/users-list/users-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tickets', component: TicketsListComponent },
  { path: 'tickets/create', component: TicketCreationComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/list', component: UsersListComponent }
];
