import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contenedor } from '../models/Contenedor';
import { Observable } from 'rxjs';
import { Reposicion } from '../models/Reposicion';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})

export class ContenedoresService {

  API_URI = 'http://81.33.23.210:3000/api';

  constructor(private http: HttpClient) {}

  getContenedores() {
    return this.http.get(`${this.API_URI}/contenedores`)
  }

  getNumber() {
    return this.http.get(`${this.API_URI}/contenedores/number`)
  }
  
  getCalles() {
    return this.http.get(`${this.API_URI}/contenedores/calles`)
  }

  getDenominaciones() {
    return this.http.get(`${this.API_URI}/contenedores/denominaciones`)
  }

  verBajas() {
    return this.http.get(`${this.API_URI}/contenedores/bajas`)
  }

  verReposiciones(matricula: any) {
    return this.http.get(`${this.API_URI}/contenedores/reposiciones/${matricula}`)
  }

  getCoincidencia(direccion: any) {
    return this.http.get(`${this.API_URI}/contenedores/coincidencia/${direccion}`)
  }

  getNextID() {
    return this.http.get(`${this.API_URI}/contenedores/id`)
  }

  buscar2(calle: any, numero: any) {
    return this.http.get(`${this.API_URI}/contenedores/busquedax/${calle}/${numero}`)
  }

  buscar1(calle: any) {
    return this.http.get(`${this.API_URI}/contenedores/busquedax/${calle}`)
  }

  getLogIn(username: string, password: string) {
    return this.http.get(`${this.API_URI}/contenedores/login/${username}/${password}`)
  }

  getContenedor(matricula: number) {
    return this.http.get(`${this.API_URI}/contenedores/${matricula}`)
  }

  getContenedor2(matricula: number) {
    return this.http.get(`${this.API_URI}/contenedores/2/${matricula}`)
  }

  getReposicion(matricula: number) {
    return this.http.get(`${this.API_URI}/contenedores/reposicion/${matricula}`)
  }

  getBaja(matricula: number) {
    return this.http.get(`${this.API_URI}/contenedores/baja/${matricula}`)
  }

  sendEmail(next: number, correo: string){
    return this.http.get(`${this.API_URI}/contenedores/sendemail/${next}/${correo}`)
  }
  
  deleteContenedor(contenedor: Contenedor) {
    return this.http.post(`${this.API_URI}/contenedores/del`,contenedor)
  }

  saveContenedor(contenedor: Contenedor, reposicion: Reposicion) {
    var data = {contenedor, reposicion};
    console.log(data.contenedor.numCalle);
    return this.http.post(`${this.API_URI}/contenedores`,data)
  }

  updateContenedor(matricula: string|number, updatedContenedor: Contenedor): Observable<Contenedor> {
    return this.http.put(`${this.API_URI}/contenedores/${matricula}`, updatedContenedor)
  }

  reponerContenedor(matricula: string|number, causa: string, username: string, nombre: string, direccion: string, telefono: string, cif: string): Observable<Contenedor> {
    var data = {matricula, causa, username, nombre, direccion, telefono, cif};
    return this.http.post(`${this.API_URI}/contenedores/reposicion`, data)
  }

}
