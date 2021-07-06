import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ContenedoresService } from '../../services/contenedores.service';
import { ConstantsService } from '../../services/constants.service';

@Component({
  selector: 'app-reponerp1',
  templateUrl: './reponer.component.html',
  styleUrls: ['./reponer.component.css']
})
export class ReponerComponent implements OnInit {

  //variables
  nombre: string;
  direccion: string;
  telefono: string;
  CIF: string;
  causa: string
  matricula: any;

  constructor(private contenedoresService: ContenedoresService, private router: Router, private activatedroute: ActivatedRoute, private constant: ConstantsService) {}

  ngOnInit(): void {
    //obtenemos la matricula que se pasa por parámetros
    this.matricula= this.activatedroute.snapshot.params.matricula;
  }

  //Llama a reponer contenedor y vamos a firmar
  firmar(){
    this.contenedoresService.reponerContenedor(this.matricula, this.causa, this.constant.username, this.nombre, this.direccion, this.telefono, this.CIF).subscribe(
      res => {
        this.router.navigate(['/contenedores/firma/',this.nombre]);
      },
      err => console.log(err)
    )
  }

}
