import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    nombre: '',
    usuario: '',
    password: ''
  };

  confirmPassword = '';
  registros: any[] = [];

  // Lista de usuarios registrados
  usuariosExistentes: string[] = [];

  // Método para comprobar que el nombre de usuario es único
  usuarioUnico(usuario: string): boolean {
    return this.usuariosExistentes.includes(usuario);
  }

  // Método para manejar el envío del formulario
  onSubmit(form: any) {
    if (form.valid && this.user.password === this.confirmPassword) {
      // Verificar si el usuario ya existe
      if (this.usuarioUnico(this.user.usuario)) {
        Swal.fire({
          icon: 'error',
          title: 'Usuario ya registrado',
          text: 'Este nombre de usuario ya está en uso. Por favor, elige otro.',
          confirmButtonText: 'Entendido'
        });
      } else {
        // Agregar el nuevo usuario al registro
        this.registros.push({ ...this.user });
        this.usuariosExistentes.push(this.user.usuario); // Agregar a la lista de usuarios existentes
        localStorage.setItem('usuarios', JSON.stringify(this.registros));

        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El usuario fue registrado correctamente.',
          confirmButtonText: 'OK'
        });

        // Resetear formulario
        form.resetForm();
        this.confirmPassword = '';
      }
    } else if (this.user.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Por favor, asegúrate de que las contraseñas sean iguales.',
        confirmButtonText: 'Entendido'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos correctamente.',
        confirmButtonText: 'Entendido'
      });
    }
  }

  // Método para inicializar el componente
  ngOnInit() {
    const data = localStorage.getItem('usuarios');
    if (data) {
      this.registros = JSON.parse(data);
      // Cargar los nombres de usuario existentes en un array
      this.usuariosExistentes = this.registros.map((registro: any) => registro.usuario);
    }
  }
}
