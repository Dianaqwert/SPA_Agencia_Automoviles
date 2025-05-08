import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../componentes/navbar/navbar/navbar.component";
import { HeaderComponent } from "../componentes/header/header/header.component";
import { FooterComponent } from "../componentes/footer/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SPA_agenciaAutos_MP2';
}
