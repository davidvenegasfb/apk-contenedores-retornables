import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Contenedor } from '../../models/Contenedor' 
import { ContenedoresService } from '../../services/contenedores.service';

@Component({
  selector: 'buscar1',
  templateUrl: './buscar1.component.html',
  styleUrls: ['./buscar1.component.css']
})
export class Buscar1Component implements OnInit {

  @HostBinding('class') classes = 'row';

  contenedores: any = [];
  calle: any;

  constructor(private contenedoresService: ContenedoresService, private router: Router, private activatedroute: ActivatedRoute) {

    this.activatedroute.queryParams.subscribe(params => {
      let calle = params['calle'];
      this.calle = calle;
    });

   }

  ngOnInit() {
    this.getContenedores();
  }

  getContenedores() {
    this.contenedoresService.buscar1(this.calle).subscribe(
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
