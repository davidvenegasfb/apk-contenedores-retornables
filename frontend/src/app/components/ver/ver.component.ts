import { Component, OnInit, HostBinding } from '@angular/core';
import { Contenedor } from '../../models/Contenedor';
import { Calle } from '../../models/Calle';
import { ActivatedRoute, Router } from '@angular/router';
import { ContenedoresService } from '../../services/contenedores.service';

@Component({
  selector: 'ver-reposicion',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  contenedor: Contenedor = {
  };
  reposiciones: any;
  edit: boolean = false;
  Parser_reposiciones: any;
  auxi: any;
  calle: Calle;

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
          },
          err => console.error(err)
        )
      this.contenedoresService.getContenedor2(params.matricula)
      .subscribe(
        res => {
          this.reposiciones = res;
          this.Parser_reposiciones=this.reposiciones[0];
          this.Parser();
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  Parser(){
    if(this.reposiciones.length!=0){
      this.auxi='Reposiciones de la matrícula '+this.Parser_reposiciones.matricula+':\n';
      for(var i=0; i < this.reposiciones.length; i++){
        var imas1 = i+1;
        this.auxi+='Reposición '+imas1+':\n';
        this.Parser_reposiciones=this.reposiciones[i];
        if(this.Parser_reposiciones.fecha!=null){
          var Fecha_correcta1 = this.Parser_reposiciones.fecha.replace('T23:00:00.000Z','');
          var Fecha_correcta2 = Fecha_correcta1.substring(0,9);
          var Fecha_correcta3 = Fecha_correcta1.substring(9,10);
          var Fecha_correcta4 = +Fecha_correcta3 + 1;
          var Fecha_correcta = Fecha_correcta2 + Fecha_correcta4;

          //Para poner en orden legigle español
          var dia = Fecha_correcta.substring(8,10);
          var mes = Fecha_correcta.substring(5,7);
          var ano = Fecha_correcta.substring(0,4);
          this.auxi+='Fecha: '+dia+'/'+mes+'/'+ano+'\n';
        }
        if(this.Parser_reposiciones.entregadoPor!=null){
          this.auxi+='Entregado por: '+this.Parser_reposiciones.entregadoPor+'\n';
        }

        this.auxi+='\n';
      }
    }
  }

}
