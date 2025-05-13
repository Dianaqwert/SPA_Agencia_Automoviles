import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AutoService } from '../../services/auto.service';


@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {

 array:any=[];
 constructor (public servicioApi:AutoService){}

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




 

  

  
}