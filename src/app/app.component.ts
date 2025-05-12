import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { LogInComponent } from '../componentes/log-in/log-in.component';
import { FooterComponent } from '../componentes/footer/footer/footer.component';
import { NavbarComponent } from '../componentes/navbar/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true
})
export class AppComponent {
  title = 'SPA_agenciaAutos_MP2';
}
