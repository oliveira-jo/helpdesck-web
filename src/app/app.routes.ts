import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TicketsListComponent } from './pages/tickets/components/tickets-list/tickets-list.component';
import { HomeComponent } from './pages/shared/components/home/home.component';
import { TicketCreationComponent } from './pages/tickets/components/ticket-creation/ticket-creation.component';
import { LoginComponent } from './pages/users/components/login/login.component';
import { RegisterComponent } from './pages/users/components/register/register.component';
import { UsersListComponent } from './pages/users/components/users-list/users-list.component';
import { nonAuthUserGuard } from './services/guards/non-auth-user.guard';
import { authUserGuard } from './services/guards/auth-user.guard';
import { TicketUpdateComponent } from './pages/tickets/components/ticket-update/ticket-update.component';
import { UserUpdateComponent } from './pages/users/components/user-update/user-update.component';

export const routes: Routes = [
  // Non Auth User
  { path: '', component: HomeComponent }, // canActivate: [nonAuthUserGuard]
  { path: 'home', component: HomeComponent }, // canActivate: [nonAuthUserGuard]
  { path: 'user/login', component: LoginComponent }, // canActivate: [nonAuthUserGuard]
  { path: 'user/register', component: RegisterComponent }, //canActivate: [nonAuthUserGuard]

  // Just for User Auth
  { path: 'users', component: UsersListComponent, canActivate: [authUserGuard] },
  { path: 'user/:id/update', component: UserUpdateComponent, canActivate: [authUserGuard] },

  { path: 'tickets', component: TicketsListComponent, canActivate: [authUserGuard] },
  { path: 'tickets/create', component: TicketCreationComponent, canActivate: [authUserGuard] },
  { path: 'tickets/:id/update', component: TicketUpdateComponent, canActivate: [authUserGuard] },

];
