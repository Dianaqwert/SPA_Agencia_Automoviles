import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AutoService } from '../../services/auto.service';
import { Auto } from '../../services/auto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
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
