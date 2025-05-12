import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  imports: [CommonModule, FormsModule, RouterModule, YoutubeEmbedPipe],
  templateUrl: './financiamiento.component.html',
  styleUrls: ['./financiamiento.component.css']
})
export class FinanciamientoComponent {
  montoPrestamo: number = 50000;
  plazoMeses: number = 36;
  tasaInteres: number = 12.9;
  pagoMensual: number = 0;
  autoSeleccionado: any = null;
  montoMinimo: number = 50000;
  errorMonto: string = '';

  videoUrl = 'https://www.youtube.com/watch?v=6kJYQry7KjQ&t=3s';

  // Formulario de solicitud de préstamo
  telefono: string = '';
  formSubmitted: boolean = false;
  errorTelefono: string = '';

  validarMonto(monto: number) {
    if (monto < this.montoMinimo) {
      this.errorMonto = `El monto mínimo es de $${this.montoMinimo.toLocaleString()}`;
      this.montoPrestamo = this.montoMinimo;
    } else {
      this.errorMonto = '';
    }
    this.calcularFinanciamiento();
  }

  calcularFinanciamiento() {
    if (this.montoPrestamo >= this.montoMinimo) {
      const tasaMensual = this.tasaInteres / 100 / 12;
      const numerador = this.montoPrestamo * tasaMensual * Math.pow(1 + tasaMensual, this.plazoMeses);
      const denominador = Math.pow(1 + tasaMensual, this.plazoMeses) - 1;
      this.pagoMensual = numerador / denominador;
    } else {
      this.pagoMensual = 0;
    }
  }

  actualizarPlazo(meses: number) {
    this.plazoMeses = meses;
    this.calcularFinanciamiento();
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
    return (
      this.montoPrestamo >= this.montoMinimo &&
      this.plazoMeses > 0 &&
      this.pagoMensual > 0 &&
      !!this.telefono &&
      !this.errorTelefono
    );
  }

  solicitarPrestamo() {
    this.formSubmitted = true;
    this.validarTelefono();
    if (this.formularioValido()) {
      Swal.fire({
        icon: 'success',
        title: 'Solicitud enviada',
        text: 'Tu solicitud de préstamo ha sido enviada correctamente.'
      });
      // Limpiar formulario si se desea
      // this.telefono = '';
      // this.formSubmitted = false;
    }
  }
}
