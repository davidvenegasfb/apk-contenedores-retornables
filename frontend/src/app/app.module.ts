import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SignaturePadModule } from '@ng-plus/signature-pad';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ReposicionComponent } from './components/editar/editar.component';
import { ContenedoresListComponent } from './components/nueva-instalacion/nueva-instalacion.component';
import { DxSelectBoxModule, DxListModule, DxTemplateModule } from 'devextreme-angular';

import { ConstantsService } from './services/constants.service';
import { ContenedoresService } from './services/contenedores.service';
import { InicioComponent } from './components/inicio/inicio.component';
import { VerComponent } from './components/ver/ver.component';
import { LoginComponent } from './components/login/login.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { Buscar1Component } from './components/buscar1/buscar1.component';
import { Buscar2Component } from './components/buscar2/buscar2.component';
import { ReposicionesComponent } from './components/reposiciones/reposiciones.component';
import { BajasComponent } from './components/bajas/bajas.component';
import { VerReposicionComponent } from './components/ver-reposicion/ver-reposicion.component';
import { FirmaComponent } from './components/firma/firma.component';
import { ReponerComponent } from './components/reponer/reponer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ReposicionComponent,
    ContenedoresListComponent,
    InicioComponent,
    VerComponent,
    LoginComponent,
    BuscarComponent,
    Buscar1Component,
    Buscar2Component,
    ReposicionesComponent,
    BajasComponent,
    VerReposicionComponent,
    FirmaComponent,
    ReponerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SignaturePadModule,
    DxSelectBoxModule,
    DxListModule,
    DxTemplateModule
  ],
  providers: [
    ContenedoresService,
    ConstantsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
