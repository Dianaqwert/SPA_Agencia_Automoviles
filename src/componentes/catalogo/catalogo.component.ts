import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AutoService } from '../../services/auto.service';
import { BuscarAutoComponent } from "../buscar-auto/buscar-auto/buscar-auto.component";


@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, BuscarAutoComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {

 array:any=[];
 constructor (public servicioApi:AutoService,private router:Router){}

  ngOnInit():void{
    this.recuperarDatos();
  }

  recuperarDatos():void{
    this.servicioApi.retornar().subscribe({
      next:this.successRequest.bind(this),
      error:(err)=>{console.log(err)}
    });
 }

  successRequest(data: any): void {
    console.log(data);
    this.array = data.autos; // Aquí tomas solo el array de autos
    console.log(this.array);
  }

  verDetalle(id:number):void{
    this.router.navigate(['/detalles',id]);

  }




 

  

  
}