import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutoService } from '../../services/auto.service';
import { Auto } from '../../services/auto';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-detalle-auto',
  standalone: true,
  imports: [CommonModule, GalleriaModule, ButtonModule],
  templateUrl: './detalle-auto.component.html',
  styleUrls: ['./detalle-auto.component.css']
})

export class DetalleAutoComponent {
  private route = inject(ActivatedRoute);
  private autoService = inject(AutoService);
  
  auto: Auto | undefined;
  imagenPrincipal: string | undefined;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.auto = this.autoService.getAutoById(id);
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN' 
    }).format(price);
  }
}