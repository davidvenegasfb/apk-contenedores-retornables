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

  contenedores: any = [];
  calle: any;
  numero: any;

  constructor(private contenedoresService: ContenedoresService, private router: Router, private activatedroute: ActivatedRoute) {

    this.activatedroute.queryParams.subscribe(params => {
      let calle = params['calle'];
      let numero = params['numero'];
      this.calle = calle;
      this.numero = numero;
    });

   }

  ngOnInit() {
    this.getContenedores();
  }

  getContenedores() {
    this.contenedoresService.buscar2(this.calle, this.numero).subscribe(
      res => {
        this.contenedores = res;
      },
      err => console.error(err)
    );
  }

  deleteContenedor(contenedor: Contenedor){
    this.contenedoresService.deleteContenedor(contenedor).subscribe(
      res => {
        this.getContenedores();
      },
      err => console.log(err)
    )
  }

  editContenedor(contenedor: Contenedor) {
    this.contenedoresService.getContenedor(contenedor.matricula)
    .subscribe(
      res => {
        this.router.navigate(['/contenedores/edit/', contenedor.matricula]);
      },
      err => console.log(err)
    )
  }

  seeContenedor(contenedor: Contenedor) {
    this.contenedoresService.getContenedor(contenedor.matricula)
    .subscribe(
      res => {
        this.router.navigate(['/contenedores/ver/', contenedor.matricula]);
      },
      err => console.log(err)
    )
  }

  reponerContenedor(contenedor: Contenedor) {
    this.router.navigate(['/contenedores/reponerp1/', contenedor.matricula]);
  }

}
