import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContenedoresListComponent } from './components/nueva-instalacion/nueva-instalacion.component'
import { ReposicionComponent } from './components/editar/editar.component'
import { InicioComponent } from './components/inicio/inicio.component';
import { VerComponent } from './components/ver/ver.component';
import { LoginComponent } from './components/login/login.component';
import { ReponerComponent } from './components/reponer/reponer.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { Buscar1Component } from './components/buscar1/buscar1.component';
import { Buscar2Component } from './components/buscar2/buscar2.component';
import { ReposicionesComponent } from './components/reposiciones/reposiciones.component';
import { BajasComponent } from './components/bajas/bajas.component';
import { VerReposicionComponent } from './components/ver-reposicion/ver-reposicion.component';
import { FirmaComponent } from './components/firma/firma.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/contenedores/login',
    pathMatch: 'full'
  },{
    path: 'contenedores/nuevo',
    component: ContenedoresListComponent,
  },{
    path: 'contenedores/add',
    component: ReposicionComponent
  },{
    path: 'contenedores/edit/:matricula',
    component: ReposicionComponent
  },{
    path: 'contenedores/ver/:matricula',
    component: VerComponent
  },{
    path: 'contenedores/inicio',
    component: InicioComponent
  },{
    path: 'contenedores/login',
    component: LoginComponent
  },{
    path: 'contenedores/login/:username/:password',
    component: InicioComponent
  },{
    path: 'contenedores/buscar',
    component: BuscarComponent
  },{
    path: 'contenedores/vista1/:calle',
    component: Buscar1Component
  },{
    path: 'contenedores/vista2/:calle/:numero',
    component: Buscar2Component
  },{
    path: 'contenedores/reposiciones/:matricula',
    component: ReposicionesComponent
  },{
    path: 'contenedores/bajas',
    component: BajasComponent
  },{
    path: 'contenedores/reposicion/:matricula',
    component: VerReposicionComponent
  },{
    path: 'contenedores/firma/:receptor',
    component: FirmaComponent
  },{
    path: 'contenedores/reponerp1/:matricula',
    component: ReponerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
