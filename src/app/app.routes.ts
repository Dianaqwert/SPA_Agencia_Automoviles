import { Routes } from '@angular/router';
import { InicioComponent } from '../componentes/inicio/inicio.component';
import { LowerCasePipe } from '@angular/common';
import { LogInComponent } from '../componentes/log-in/log-in.component';
import { CatalogoComponent } from '../componentes/catalogo/catalogo.component';
import { DetalleAutoComponent } from '../componentes/detalle-auto/detalle-auto.component';

export const routes: Routes = [
    {path:'inicio',component:InicioComponent},
    {path:'log-in',component:LogInComponent},
    {path:'catalogo',component:CatalogoComponent},
    {path:'detalle/:id',component:DetalleAutoComponent},
    {path:'**',pathMatch:'full',redirectTo:'inicio'}
];
