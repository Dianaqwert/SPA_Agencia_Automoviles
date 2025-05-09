import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutoService } from '../../services/auto.service';
import { Auto } from '../../services/auto';

@Component({
  selector: 'app-detalle-auto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-auto.component.html',
  styleUrls: ['./detalle-auto.component.css']
})
export class DetalleAutoComponent {
  private route = inject(ActivatedRoute);
  private autoService = inject(AutoService);
  
  auto: Auto | undefined;
  imagenPrincipal: string | undefined;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.auto = this.autoService.getAutoById(id);
      if (this.auto) {
        this.imagenPrincipal = this.auto.fuente_img[0];
      }
    }
  }

  cambiarImagen(img: string) {
    this.imagenPrincipal = img;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN' 
    }).format(price);
  }
}