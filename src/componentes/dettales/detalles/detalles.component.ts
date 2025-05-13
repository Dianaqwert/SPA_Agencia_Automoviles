import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoService } from '../../../services/auto.service';
import {MatChipsModule} from '@angular/material/chips';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detalles',
  imports: [MatChipsModule,CommonModule,RouterModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css',
  standalone:true
})
export class DetallesComponent {
  auto:any;

  constructor(private router:ActivatedRoute,
    private servicioApi:AutoService,
    private router2:Router
  ){}

  ngOnInit(): void {
  const id = Number(this.router.snapshot.paramMap.get('id'));
  this.servicioApi.retornarPorId(id).subscribe(data => {
    this.auto = data;
  });
}

  regresarCat():void{
    this.router2.navigate(['/catalogo'])
  }



}
