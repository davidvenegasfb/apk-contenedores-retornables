import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Contenedor } from '../../models/Contenedor'
import { ContenedoresService } from '../../services/contenedores.service';

@Component({
  selector: 'buscar2',
  templateUrl: './buscar2.component.html',
  styleUrls: ['./buscar2.component.css']
})
export class Buscar2Component implements OnInit {

  @HostBinding('class') classes = 'row';

  //variables
  contenedores: any = [];
  calle: any;
  numero: any;

  constructor(private contenedoresService: ContenedoresService, private router: Router, private activatedroute: ActivatedRoute) {

    //guadamos la calle y el número que se pasan por la url
    this.activatedroute.queryParams.subscribe(params => {
      let calle = params['calle'];
      let numero = params['numero'];
      this.calle = calle;
      this.numero = numero;
    });

  }

  //Llamamos a getContenedores
  ngOnInit() {
    this.getContenedores();
  }

  //Obtenemos los contenedores en la calle y el número que se nos han pasado por parámetros
  getContenedores() {
    this.contenedoresService.buscar2(this.calle, this.numero).subscribe(
      res => {
        this.contenedores = res;
      },
      err => console.error(err)
    );
  }

  //Nos encontramos con varias funciones que depende de lo que pretendan hacer nos llevarán a un componente u otro:

  //Borrar un contenedor
  deleteContenedor(contenedor: Contenedor) {
    this.contenedoresService.deleteContenedor(contenedor).subscribe(
      res => {
        this.getContenedores();
      },
      err => console.log(err)
    )
  }

  //Modificar un contenedor
  editContenedor(contenedor: Contenedor) {
    this.contenedoresService.getContenedor(contenedor.matricula)
      .subscribe(
        res => {
          this.router.navigate(['/contenedores/edit/', contenedor.matricula]);
        },
        err => console.log(err)
      )
  }

  //Ver un contenedor
  seeContenedor(contenedor: Contenedor) {
    this.contenedoresService.getContenedor(contenedor.matricula)
      .subscribe(
        res => {
          this.router.navigate(['/contenedores/ver/', contenedor.matricula]);
        },
        err => console.log(err)
      )
  }

  //Reponer un contenedor
  reponerContenedor(contenedor: Contenedor) {
    this.router.navigate(['/contenedores/reponerp1/', contenedor.matricula]);
  }

}
