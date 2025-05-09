import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogInComponent } from '../componentes/log-in/log-in.component';
import { FooterComponent } from '../componentes/footer/footer/footer.component';
import { HeaderComponent } from '../componentes/header/header/header.component';
import { NavbarComponent } from '../componentes/navbar/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LogInComponent, FooterComponent, HeaderComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true
})
export class AppComponent {
  title = 'SPA_agenciaAutos_MP2';
}
