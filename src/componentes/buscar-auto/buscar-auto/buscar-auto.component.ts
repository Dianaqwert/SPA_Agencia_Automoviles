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
  // variable para almacenar lo que el usuario escribe en el input de búsqueda
  modeloBuscado: string = '';

  // arreglo donde se guardan los autos que coincidan con la búsqueda
  autosEncontrados: Auto[] = [];

  // bandera que indica si el usuario ya hizo una búsqueda (para controlar los mensajes en pantalla)
  busquedaRealizada: boolean = false;

  // inyectamos el servicio de autos y el router para navegar entre páginas
  constructor(private autoService: AutoService, private router: Router) {}

  // método que se ejecuta al dar clic en el botón "Buscar"
  buscar() {
    // reseteamos la bandera antes de hacer la nueva búsqueda
    this.busquedaRealizada = false;

    // verificamos que no se haya enviado un string vacío o solo espacios
    if (this.modeloBuscado.trim() !== '') {

      // llamamos al servicio que busca autos por modelo y nos suscribimos a la respuesta
      this.autoService.buscarPorModelo(this.modeloBuscado).subscribe((result) => {

        // guardamos los resultados en el arreglo
        this.autosEncontrados = result;

        // activamos la bandera para mostrar resultados o mensaje de "no encontrados"
        this.busquedaRealizada = true;
      });
    }
  }

  // método para redirigir al detalle de un auto usando su ID
  verDetalle(id: number): void {
    this.router.navigate(['/detalles', id]);
  }
}
