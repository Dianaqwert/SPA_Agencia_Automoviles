// src/app/services/auto.service.ts
import { Injectable } from '@angular/core';
import { Auto } from './auto';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  private autos: Auto[] = [
    {
      id: '1',
      ofertas: true,
      oportunidades: false,
      marca: 'Kia',
      modelo: 'Sedona',
      anio: 2021,
      precio: 489000,
      tipo_auto: 'Minivan',
      transmision: 'Automática',
      kilometraje: 35000,
      color: 'Gris',
      pasajeros: 7,
      fuente_img: ['Sedona-1.webp', 'Sedona-2.webp', 'Sedona-3.webp']
    },
    {
      id: '2',
      ofertas: false,
      oportunidades: true,
      marca: 'Toyota',
      modelo: 'RAV4',
      anio: 2022,
      precio: 520000,
      tipo_auto: 'SUV',
      transmision: 'Automática',
      kilometraje: 15000,
      color: 'Blanco',
      pasajeros: 5,
      fuente_img: ['rav4-1.webp', 'rav4-2.webp']
    }
    // Agrega más autos según necesites
  ];

  constructor() { }

  // Obtener todos los autos
  getAutos(): Auto[] {
    return this.autos;
  }

  // Obtener autos en oferta
  getAutosOferta(): Auto[] {
    return this.autos.filter(auto => auto.ofertas);
  }

  // Obtener autos como oportunidades
  getAutosOportunidad(): Auto[] {
    return this.autos.filter(auto => auto.oportunidades);
  }

  // Obtener un auto por ID
  getAutoById(id: string): Auto | undefined {
    return this.autos.find(auto => auto.id === id);
  }

  // Formatear precio
  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  }
}