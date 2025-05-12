import { Routes } from '@angular/router';
import { InicioComponent } from '../componentes/inicio/inicio.component';
import { LowerCasePipe } from '@angular/common';
import { LogInComponent } from '../componentes/log-in/log-in.component';
import { CatalogoComponent } from '../componentes/catalogo/catalogo.component';
//import { DetalleAutoComponent } from '../componentes/detalle-auto/detalle-auto.component';
import { ServiciosComponent } from '../componentes/servicios/servicios/servicios.component';
import { RegisterComponent } from '../componentes/register/register.component';
import { FinanciamientoComponent } from '../componentes/financiamiento/financiamiento.component';
import { EquipoComponent } from '../componentes/equipo/equipo/equipo.component';

export const routes: Routes = [
    {path:'inicio',component:InicioComponent},
    {path:'log-in',component:LogInComponent},
    {path:'catalogo',component:CatalogoComponent},
    {path:'servicios',component:ServiciosComponent},
    //{path:'detalle/:id',component:DetalleAutoComponent},
    {path:'register',component:RegisterComponent},
    {path:'financiamiento',component:FinanciamientoComponent},
    {path:'equipo',component:EquipoComponent},
    {path:'**',pathMatch:'full',redirectTo:'inicio'}
];
