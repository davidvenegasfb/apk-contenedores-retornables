import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContenedoresService } from '../../services/contenedores.service';

@Component({
  selector: 'app-bajas',
  templateUrl: './bajas.component.html',
  styleUrls: ['./bajas.component.css']
})

export class BajasComponent {

  constructor(private contenedoresService: ContenedoresService, private router: Router, private activatedroute: ActivatedRoute) { 

  }

  bajas: any = [];

  @HostBinding('class') classes = 'row';

  ngOnInit() {
    this.contenedoresService.verBajas()
      .subscribe(
        res => {
          this.bajas = res;
          this.Parser(this.bajas);
        },
        err => console.error(err)
      )
  }

  Parser(bajas){
    for(var _i = 0; _i < bajas.length; _i++){
      var str = bajas[_i].fechabaja;
      var Fecha_correcta1 = str.replace('T23:00:00.000Z','');
      var Fecha_correcta2 = Fecha_correcta1.substring(0,9);
      var Fecha_correcta3 = Fecha_correcta1.substring(9,10);
      var Fecha_correcta4 = +Fecha_correcta3 + 1;
      var Fecha_correcta = Fecha_correcta2 + Fecha_correcta4;

      var dia = Fecha_correcta.substring(8,10);
      var mes = Fecha_correcta.substring(5,7);
      var ano = Fecha_correcta.substring(0,4);
      bajas[_i].fechabaja = dia + '-' + mes + '-' + ano;
    }
  }

  seeBajas(matricula: number) {
    this.router.navigate(['/contenedores/baja/', matricula]);
  }

}
