import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registro-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="edit-form-container" *ngIf="registro">
      <h3 class="edit-title">Editar Registro</h3>
      <form class="edit-form">
        <div class="form-row">
          <mat-form-field class="form-field">
            <mat-label>Número de Registro</mat-label>
            <input matInput [(ngModel)]="registro.id" name="id" readonly>
          </mat-form-field>

          <mat-form-field class="form-field">
            <mat-label>Fecha de Registro</mat-label>
            <input matInput [(ngModel)]="registro.fechaDeRegistro" name="fechaDeRegistro" readonly>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field class="form-field">
            <mat-label>Nombre</mat-label>
            <input matInput [(ngModel)]="registro.nombre" name="nombre">
          </mat-form-field>

          <mat-form-field class="form-field">
            <mat-label>Apellidos</mat-label>
            <input matInput [(ngModel)]="registro.apellidos" name="apellidos">
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field class="form-field">
            <mat-label>Nombre de Usuario</mat-label>
            <input matInput [(ngModel)]="registro.username" name="username">
          </mat-form-field>

          <mat-form-field class="form-field">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="registro.email" name="email">
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field class="form-field">
            <mat-label>Dirección</mat-label>
            <input matInput [(ngModel)]="registro.direccion" name="direccion">
          </mat-form-field>

          <mat-form-field class="form-field">
            <mat-label>Código Postal</mat-label>
            <input matInput [(ngModel)]="registro.cp" name="cp">
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field class="form-field">
            <mat-label>Fecha de Cita</mat-label>
            <input matInput [(ngModel)]="registro.fechaCita" name="fechaCita">
          </mat-form-field>

          <mat-form-field class="form-field">
            <mat-label>Servicio Solicitado</mat-label>
            <input matInput [(ngModel)]="registro.servicios" name="servicios">
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field class="form-field">
            <mat-label>Estado</mat-label>
            <input matInput [(ngModel)]="registro.estado" name="estado">
          </mat-form-field>

          <mat-form-field class="form-field">
            <mat-label>Nivel de Urgencia</mat-label>
            <input matInput [(ngModel)]="registro.urgencia" name="urgencia">
          </mat-form-field>
        </div>

        <div class="form-actions">
          <button mat-raised-button class="save-btn" (click)="guardarCambios()">
            Guardar
          </button>
          <button mat-raised-button class="cancel-btn" (click)="cancelarEdicion()">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .edit-form-container {
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
      margin-top: 20px;
    }

    .edit-title {
      margin-bottom: 20px;
      color: #333;
    }

    .form-row {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
    }

    .form-field {
      flex: 1;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 20px;
    }

    .save-btn {
      background-color: #FFA739;
      color: white;
    }

    .cancel-btn {
      background-color: #f44336;
      color: white;
    }
  `]
})
export class RegistroEditorComponent {
  @Input() registro: any;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  guardarCambios() {
    this.guardar.emit(this.registro);
  }

  cancelarEdicion() {
    this.cancelar.emit();
  }
} 