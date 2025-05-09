import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  autos = [
    {
      "ofertas": true,
      "oportunidades": false,
      "marca": "Kia",
      "modelo": "Sedona",
      "anio": 2021,
      "precio": 489000,
      "tipo_auto": "Minivan",
      "transmision": "Automática",
      "kilometraje": 35000,
      "color": "Gris",
      "pasajeros": 7,
      "fuente_img": ["Sedona-1.webp", "Sedona-2.webp", "Sedona-3.webp"]
      // , sedona-2.webp, sedona-3.webp
    },
    {
      "ofertas": false,
      "oportunidades": true,
      "marca": "Toyota",
      "modelo": "Avanza",
      "anio": 2022,
      "precio": 299000,
      "tipo_auto": "SUV Compacto",
      "transmision": "Manual",
      "kilometraje": 22000,
      "color": "Rojo",
      "pasajeros": 7,
      "fuente_img": ["Avanza-1.webp", "Avanza-2.webp", "Avanza-3.webp"]
    },
    {
      "ofertas": true,
      "oportunidades": true,
      "marca": "Mazda",
      "modelo": "CX-3",
      "anio": 2020,
      "precio": 379000,
      "tipo_auto": "Crossover",
      "transmision": "Automática",
      "kilometraje": 28000,
      "color": "Blanco",
      "pasajeros": 5,
      "fuente_img": ["CX-3-1.webp", "CX-3-2.webp", "CX-3-3.webp"]
    }
  ];

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN' 
    }).format(price);
  }
  getFirstImage(auto: any): string {
    if (auto.fuente_img && auto.fuente_img.length > 0) {
      // Ajusta esta ruta según tu estructura de archivos
      return `public/images/${auto.fuente_img[0]}`;
    }
    return `https://placehold.co/600x400?text=${auto.marca}+${auto.modelo}`;
  }
}