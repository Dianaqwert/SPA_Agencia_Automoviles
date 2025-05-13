import { Component } from '@angular/core';
import { AutoService } from '../../../services/auto.service';
import { Auto } from '../../../app/auto';
import { FormsModule } from '@angular/forms';
import { Router ,RouterModule} from '@angular/router';


@Component({
  selector: 'app-buscar-auto',
  imports: [FormsModule,],
  templateUrl: './buscar-auto.component.html',
  styleUrl: './buscar-auto.component.css'
})
export class BuscarAutoComponent {
   // Variable para almacenar lo que el usuario escribe en el input de búsqueda
  modeloBuscado: string = '';

  // Arreglo donde se guardan los autos que coincidan con la búsqueda
  autosEncontrados: Auto[] = [];

  // Bandera que indica si el usuario ya hizo una búsqueda (para controlar los mensajes en pantalla)
  busquedaRealizada: boolean = false;

  // Inyectamos el servicio de autos y el router para navegar entre páginas
  constructor(private autoService: AutoService, private router: Router) {}

  // Método que se ejecuta al dar clic en el botón "Buscar"
  buscar() {
    // Reseteamos la bandera antes de hacer la nueva búsqueda
    this.busquedaRealizada = false;

    // Verificamos que no se haya enviado un string vacío o solo espacios
    if (this.modeloBuscado.trim() !== '') {

      // Llamamos al servicio que busca autos por modelo y nos suscribimos a la respuesta
      this.autoService.buscarPorModelo(this.modeloBuscado).subscribe((result) => {

        // Guardamos los resultados en el arreglo
        this.autosEncontrados = result;

        // Activamos la bandera para mostrar resultados o mensaje de "no encontrados"
        this.busquedaRealizada = true;
      });
    }
  }

  // Método para redirigir al detalle de un auto usando su ID
  verDetalle(id: number): void {
    this.router.navigate(['/detalles', id]);
  }
}
