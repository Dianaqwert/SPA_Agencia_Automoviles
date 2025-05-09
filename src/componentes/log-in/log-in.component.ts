import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  standalone: true, // <-- Esto es clave para componentes standalone
  imports: [FormsModule], // <-- Importar FormsModule aquí
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  // Arreglo de administradores
  adminAccounts = [
    { username: 'admin1', password: '1234', fullName: 'Administrador Uno' },
    { username: 'admin2', password: 'abcd', fullName: 'Administrador Dos' },
    { username: 'admin3', password: 'pass', fullName: 'Administrador Tres' }
  ];

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  login() {
    let validUser = this.adminAccounts.find(
      user => user.username === this.username && user.password === this.password
    );

    if (validUser) {
      // Lógica de éxito (redirección o mensaje)
      this.errorMessage = '';
      alert(`Bienvenido ${validUser.fullName}`);
      // this.router.navigate(['/dashboard']); // Si tienes routing
    } else {
      this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      alert(this.errorMessage);
    }
  }
}