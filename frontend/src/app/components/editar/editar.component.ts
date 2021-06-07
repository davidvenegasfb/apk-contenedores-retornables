import { Component, OnInit, HostBinding } from '@angular/core';
import { Contenedor } from '../../models/Contenedor';
import { ActivatedRoute, Router } from '@angular/router'
import { ContenedoresService } from '../../services/contenedores.service';

@Component({
  selector: 'app-reposicion',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class ReposicionComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  contenedor: Contenedor = {
  };
  fechainstalacion: string;

  edit: boolean = false;

  constructor(private contenedoresService: ContenedoresService, private router: Router, private activatedroute: ActivatedRoute) { 

  }

  ngOnInit() {
    const params = this.activatedroute.snapshot.params;
    if (params.matricula) {
      this.contenedoresService.getContenedor(params.matricula)
        .subscribe(
          res => {
            this.contenedor = res;
            this.edit = true;
            this.fechainstalacion=this.contenedor.fechinatala.toString().substring(0,10);
            this.fechainstalacion=String(Number(this.fechainstalacion.substring(8,10))+1)+'/'+this.fechainstalacion.substring(5,7)+'/'+this.fechainstalacion.substring(0,4);
            this.contenedor.fechinatala=this.fechainstalacion;
          },
          err => console.error(err)
        )
    }
  }

  updateContenedor() {
    this.fechainstalacion=(document.getElementById("md") as HTMLTextAreaElement).value;
    this.contenedor.fechinatala=this.fechainstalacion.substring(6,10)+'-'+this.fechainstalacion.substring(3,5)+'-'+this.fechainstalacion.substring(0,2)
    this.contenedoresService.updateContenedor(this.contenedor.matricula, this.contenedor)
    .subscribe(
      res => {
        this.router.navigate(['/contenedores/inicio']);
      },
      err => console.log(err)
    )
  }

}
