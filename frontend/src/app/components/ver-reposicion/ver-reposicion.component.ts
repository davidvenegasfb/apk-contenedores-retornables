import { Component, OnInit} from '@angular/core';
import { Reposicion } from '../../models/Reposicion';
import { ActivatedRoute, Router } from '@angular/router'
import { ContenedoresService } from '../../services/contenedores.service';

@Component({
  selector: 'app-ver-reposicion',
  templateUrl: './ver-reposicion.component.html',
  styleUrls: ['./ver-reposicion.component.css']
})
export class VerReposicionComponent implements OnInit {

  constructor(private contenedoresService: ContenedoresService, private router: Router, private activatedroute: ActivatedRoute) { 
  
  }

  reposicion: Reposicion = {
  };

  ngOnInit() {
    const params = this.activatedroute.snapshot.params;
    if(params.matricula){
      this.contenedoresService.getReposicion(params.matricula)
      .subscribe(
        res => {
          this.reposicion=res[0];
          this.Parser(this.reposicion);
        },
        err => console.log(err)
      )
    }
  }

  
  Parser(reposicion){
    var str = reposicion.fecha;
    var Fecha_correcta1 = str.replace('T23:00:00.000Z','');
    var Fecha_correcta2 = Fecha_correcta1.substring(0,9);
    var Fecha_correcta3 = Fecha_correcta1.substring(9,10);
    var Fecha_correcta4 = +Fecha_correcta3 + 1;
    var Fecha_correcta = Fecha_correcta2 + Fecha_correcta4;

    var dia = Fecha_correcta.substring(8,10);
    var mes = Fecha_correcta.substring(5,7);
    var ano = Fecha_correcta.substring(0,4);
    reposicion.fecha = dia + '-' + mes + '-' + ano;
  }

}
