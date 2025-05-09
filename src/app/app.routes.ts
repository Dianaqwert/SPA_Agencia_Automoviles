import { Routes } from '@angular/router';
import { InicioComponent } from '../componentes/inicio/inicio.component';
import { LowerCasePipe } from '@angular/common';
import { LogInComponent } from '../componentes/log-in/log-in.component';

export const routes: Routes = [
    {path:'inicio',component:InicioComponent},
    {path:'log-in',component:LogInComponent},
    {path:'**',pathMatch:'full',redirectTo:'inicio'}
];
