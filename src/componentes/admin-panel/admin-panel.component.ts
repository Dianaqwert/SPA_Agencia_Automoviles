import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { LogInComponent } from '../log-in/log-in.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-panel',
  standalone: true,
  imports: [
    LogInComponent,
    MatTableModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public userNombreP: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = [
    'acciones',
    'id',
    'fechaDeRegistro',
    'nombre',
    'apellidos',
    'username',
    'email',
    'direccion',
    'cp',
    'fechaCita',
    'servicios',
    'estado',
    'urgencia'
  ];
  
  dataSource = new MatTableDataSource<any>([]);
  selectedRegistro: any = null;
  selectedRowIndex: number = -1;
  
  constructor(private router: Router) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userNombreP = user.fullName;
    }
  }

  ngOnInit() {
    // Verificar si hay una sesión activa
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      this.router.navigate(['/log-in']);
      return;
    }
    this.cargarDatos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarDatos() {
    const registros = localStorage.getItem('registroFormulario');
    if (registros) {
      this.dataSource.data = JSON.parse(registros);
    }
  }

  editarRegistro(registro: any) {
    this.selectedRegistro = { ...registro };
    this.selectedRowIndex = this.dataSource.data.findIndex(r => r.id === registro.id);
  }

  eliminarRegistro(id: number) {
    Swal.fire({
      title: '¿Eliminar registro?',
      text: '¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FFA739',
      cancelButtonColor: '#1d1c1c',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const registros = this.dataSource.data.filter(registro => registro.id !== id);
        localStorage.setItem('registroFormulario', JSON.stringify(registros));
        this.cargarDatos();
        this.selectedRegistro = null;
        this.selectedRowIndex = -1;

        Swal.fire({
          title: '¡Eliminado!',
          text: 'El registro ha sido eliminado exitosamente',
          icon: 'success',
          confirmButtonColor: '#FFA739',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  guardarCambios() {
    if (this.selectedRegistro) {
      const index = this.dataSource.data.findIndex(r => r.id === this.selectedRegistro.id);
      if (index !== -1) {
        this.dataSource.data[index] = { ...this.selectedRegistro };
        localStorage.setItem('registroFormulario', JSON.stringify(this.dataSource.data));
        this.selectedRegistro = null;
        this.selectedRowIndex = -1;
        this.cargarDatos();
      }
    }
  }

  cancelarEdicion() {
    this.selectedRegistro = null;
    this.selectedRowIndex = -1;
  }

  // Método para filtrar la tabla
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Método para manejar la selección de fila
  seleccionarFila(index: number) {
    this.selectedRowIndex = index;
    this.editarRegistro(this.dataSource.data[index]);
  }

  // Método para cerrar sesión
  cerrarSesion() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que deseas cerrar tu sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#FFA739',
      cancelButtonColor: '#1d1c1c',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('currentUser');
        Swal.fire({
          title: '¡Sesión cerrada!',
          text: 'Has cerrado sesión exitosamente',
          icon: 'success',
          confirmButtonColor: '#FFA739'
        }).then(() => {
          this.router.navigate(['/inicio']);
        });
      }
    });
  }
}
