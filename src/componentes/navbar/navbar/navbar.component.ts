import { Component, inject } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { LogInComponent } from '../../log-in/log-in.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {
    // Subscribe to router events to update the name when navigation occurs
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateUserName();
      }
    });
  }

  nom = 'Iniciar Sesión';

  private updateUserName() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.nom = user.fullName;
    } else {
      this.nom = 'Iniciar Sesión';
    }
  }
}
