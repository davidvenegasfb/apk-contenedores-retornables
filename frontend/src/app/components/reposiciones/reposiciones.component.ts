import { Component, HostBinding} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContenedoresService } from '../../services/contenedores.service';

@Component({
  selector: 'app-reposiciones',
  templateUrl: './reposiciones.component.html',
  styleUrls: ['./reposiciones.component.css']
})
export class ReposicionesComponent {

  constructor(private contenedoresService: ContenedoresService, private router: Router, private activatedroute: ActivatedRoute) { 
      
  }

  reposiciones: any = [];

  @HostBinding('class') classes = 'row';

  ngOnInit() {
    const params = this.activatedroute.snapshot.params;
    if (params.matricula) {
    this.contenedoresService.verReposiciones(params.matricula)
      .subscribe(
        res => {
          this.reposiciones = res;
          this.Parser(this.reposiciones);
        },
        err => console.error(err)
      )
    }
  }

  
  Parser(reposiciones){
    for(var _i = 0; _i < reposiciones.length; _i++){
      var str = reposiciones[_i].fecha;
      var Fecha_correcta1 = str.replace('T23:00:00.000Z','');
      var Fecha_correcta2 = Fecha_correcta1.substring(0,9);
      var Fecha_correcta3 = Fecha_correcta1.substring(9,10);
      var Fecha_correcta4 = +Fecha_correcta3 + 1;
      var Fecha_correcta = Fecha_correcta2 + Fecha_correcta4;

      var dia = Fecha_correcta.substring(8,10);
      var mes = Fecha_correcta.substring(5,7);
      var ano = Fecha_correcta.substring(0,4);
      reposiciones[_i].fecha = dia + '-' + mes + '-' + ano;
    }
  }

  seeReposicion(matricula: number) {
    this.router.navigate(['/contenedores/reposicion/', matricula]);
  }


}