import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';

@Pipe({
  name: 'youtubeEmbed',
  standalone: true
})
export class YoutubeEmbedPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    if (!url) return this.sanitizer.bypassSecurityTrustResourceUrl('');

    // Extraer el ID del video de YouTube
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    const videoId = match && match[2].length === 11 ? match[2] : '';
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}

@Component({
  selector: 'app-financiamiento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    YoutubeEmbedPipe,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatListModule,
    MatTooltipModule
  ],
  templateUrl: './financiamiento.component.html',
  styleUrls: ['./financiamiento.component.css']
})
export class FinanciamientoComponent {
  montoPrestamo: number = 50000;
  plazoMeses: number | undefined;
  tasaInteres: number = 12.9;
  pagoMensual: number = 0;
  autoSeleccionado: any = null;
  montoMinimo: number = 50000;
  errorMonto: string = '';
  nombreUsuario: string = '';
  errorNombreUsuario: string = '';

  videoUrl = 'https://www.youtube.com/watch?v=6kJYQry7KjQ&t=3s';

  // Formulario de solicitud de préstamo
  telefono: string = '';
  formSubmitted: boolean = false;
  errorTelefono: string = '';
  errorMontoPrestamo: string = '';
  errorPlazo: string = '';
  errorPagoMensual: string = '';
  envios: number = 0;
  solicitudes: any[] = [];

  constructor(private snackBar: MatSnackBar) {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.solicitudes = JSON.parse(localStorage.getItem('solicitudesFinanciamiento') || '[]');
  }

  validarNombreUsuario() {
    if (!this.nombreUsuario) {
      this.errorNombreUsuario = 'El nombre de usuario es requerido';
    } else if (this.nombreUsuario.length < 3) {
      this.errorNombreUsuario = 'El nombre debe tener al menos 3 caracteres';
    } else {
      this.errorNombreUsuario = '';
    }
  }

  validarMontoPrestamo() {
    if (!this.montoPrestamo) {
      this.errorMontoPrestamo = 'El monto es requerido';
    } else if (this.montoPrestamo < this.montoMinimo) {
      this.errorMontoPrestamo = `El monto mínimo es $${this.montoMinimo.toLocaleString()}`;
    } else if (this.montoPrestamo % 1000 !== 0) {
      this.errorMontoPrestamo = 'El monto debe ser múltiplo de $1,000';
    } else {
      this.errorMontoPrestamo = '';
    }
  }

  validarPlazo() {
    const plazosValidos = [24, 36, 48, 60];
    if (!this.plazoMeses) {
      this.errorPlazo = 'El plazo es requerido';
    } else if (!plazosValidos.includes(this.plazoMeses)) {
      this.errorPlazo = 'El plazo debe ser 24, 36, 48 o 60 meses';
    } else {
      this.errorPlazo = '';
    }
  }

  validarPagoMensual() {
    if (!this.pagoMensual || this.pagoMensual <= 0) {
      this.errorPagoMensual = 'El pago mensual debe ser mayor a $0';
    } else {
      this.errorPagoMensual = '';
    }
  }

  // Validación extra: teléfono debe ser 10 dígitos
  validarTelefono() {
    if (!this.telefono) {
      this.errorTelefono = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(this.telefono)) {
      this.errorTelefono = 'El teléfono debe tener 10 dígitos';
    } else {
      this.errorTelefono = '';
    }
  }

  // Validación general del formulario
  formularioValido(): boolean {
    this.validarMontoPrestamo();
    this.validarPlazo();
    this.validarPagoMensual();
    this.validarTelefono();
    this.validarNombreUsuario();
    return (
      this.montoPrestamo >= this.montoMinimo &&
      this.montoPrestamo % 1000 === 0 &&
      this.plazoMeses !== undefined &&
      [24, 36, 48, 60].includes(this.plazoMeses) &&
      this.pagoMensual > 0 &&
      !!this.telefono &&
      !!this.nombreUsuario &&
      !this.errorMontoPrestamo &&
      !this.errorPlazo &&
      !this.errorPagoMensual &&
      !this.errorTelefono &&
      !this.errorNombreUsuario
    );
  }

  solicitarPrestamo() {
    this.formSubmitted = true;
    this.validarMontoPrestamo();
    this.validarPlazo();
    this.validarPagoMensual();
    this.validarTelefono();
    this.validarNombreUsuario();
    if (this.formularioValido()) {
      const nuevaSolicitud = {
        nombreUsuario: this.nombreUsuario,
        montoPrestamo: this.montoPrestamo,
        plazoMeses: this.plazoMeses,
        pagoMensual: this.pagoMensual,
        telefono: this.telefono,
        fecha: new Date().toLocaleString(),
        estado: 'pendiente'
      };
      let solicitudes = JSON.parse(localStorage.getItem('solicitudesFinanciamiento') || '[]');
      solicitudes.push(nuevaSolicitud);
      localStorage.setItem('solicitudesFinanciamiento', JSON.stringify(solicitudes));
      this.envios++;
      this.cargarSolicitudes();

      Swal.fire({
        title: '¡Éxito!',
        text: 'Solicitud enviada con éxito',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#FFA739',
        timer: 3000,
        timerProgressBar: true
      });

      this.telefono = '';
      this.nombreUsuario = '';
      this.formSubmitted = false;
    }
  }

  // Reimplementar métodos requeridos por el template
  validarMonto(monto: number) {
    this.montoPrestamo = monto;
    this.validarMontoPrestamo();
    this.calcularFinanciamiento();
  }

  calcularFinanciamiento() {
    if (this.montoPrestamo >= this.montoMinimo && this.plazoMeses) {
      const tasaMensual = this.tasaInteres / 100 / 12;
      const numerador = this.montoPrestamo * tasaMensual * Math.pow(1 + tasaMensual, this.plazoMeses);
      const denominador = Math.pow(1 + tasaMensual, this.plazoMeses) - 1;
      this.pagoMensual = numerador / denominador;
    } else {
      this.pagoMensual = 0;
    }
    this.validarPagoMensual();
  }

  actualizarPlazo(meses: number) {
    this.plazoMeses = meses;
    this.validarPlazo();
    this.calcularFinanciamiento();
  }

  cambiarEstado(solicitud: any, nuevoEstado: string) {
    solicitud.estado = nuevoEstado;
    let solicitudes = JSON.parse(localStorage.getItem('solicitudesFinanciamiento') || '[]');
    const index = solicitudes.findIndex((s: any) => s.fecha === solicitud.fecha);
    if (index !== -1) {
      solicitudes[index] = solicitud;
      localStorage.setItem('solicitudesFinanciamiento', JSON.stringify(solicitudes));
      this.cargarSolicitudes();
    }
  }
}




