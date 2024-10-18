import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/shared/components/navbar/navbar.component';
import { FooterComponent } from './pages/shared/components/footer/footer.component';
import { BaseUiComponent } from "./pages/shared/components/base-ui/base-ui.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    BaseUiComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hepdesk-page';
}
