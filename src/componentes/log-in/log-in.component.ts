import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  adminAccounts = [
    { username: 'admin1', password: '1234', fullName: 'Administrador Uno' },
    { username: 'admin2', password: 'abcd', fullName: 'Administrador Dos' },
    { username: 'admin3', password: 'pass', fullName: 'Administrador Tres' }
  ];

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  login() {
    const validUser = this.adminAccounts.find(
      user => user.username === this.username && user.password === this.password
    );

    if (validUser) {
      this.errorMessage = '';
      alert(`Bienvenido ${validUser.fullName}`);
      // Redirección: this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      alert(this.errorMessage);
    }
  }
}