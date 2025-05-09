import { Component } from '@angular/core';
import { AutoService } from '../../services/auto.service';
import { Router } from '@angular/router';
import { Auto } from '../../services/auto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent {
  autos: Auto[] = [];

  constructor(
    private autoService: AutoService,
    private router: Router
  ) {
    this.autos = this.autoService.getAutos();
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);
  }
  
  verDetalle(id: string) {
    this.router.navigate(['/detalle', id]);
  }
}