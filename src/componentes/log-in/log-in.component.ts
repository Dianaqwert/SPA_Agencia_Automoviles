import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  adminAccounts = [
    { username: 'adminRene', password: '1234', fullName: 'Rene De Anda' },
    { username: 'admin2', password: 'abcd', fullName: 'Administrador Dos' },
    { username: 'admin3', password: 'pass', fullName: 'Administrador Tres' }
  ];
  
  username: string = '';
  password: string = '';
  fullName: string = '';
  errorMessage: string = '';
  
  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar si hay una sesión activa
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.router.navigate(['/admin-panel']);
    }
  }

  login() {
    const validUser = this.adminAccounts.find(
      user => user.username === this.username && user.password === this.password
    );

    if (validUser) {
      this.errorMessage = '';
      // Store user information in localStorage
      localStorage.setItem('currentUser', JSON.stringify(validUser));
      
      // Mostrar mensaje de éxito
      Swal.fire({
        title: '¡Bienvenido!',
        text: `Hola ${validUser.fullName}`,
        icon: 'success',
        confirmButtonColor: '#FFA739',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/admin-panel']);
      });
    } else {
      this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      Swal.fire({
        title: 'Error',
        text: this.errorMessage,
        icon: 'error',
        confirmButtonColor: '#FFA739'
      });
    }
  }
}
