import { Component, OnInit, HostBinding } from '@angular/core';
import { Contenedor } from '../../models/Contenedor';
import { Reposicion } from '../../models/Reposicion';
import { New } from '../../models/New';
import { ActivatedRoute, Router } from '@angular/router';
import { ContenedoresService } from '../../services/contenedores.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { loadMessages } from "devextreme/localization";

loadMessages({
  "en": {
    "Search": "Buscar",
    "dxList-nextButtonText": "Mostrar más"
  }
});

@Component({
  selector: 'app-nueva-instalacion',
  templateUrl: './nueva-instalacion.component.html',
  styleUrls: ['./nueva-instalacion.component.css']
})
export class ContenedoresListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  contenedor: Contenedor = {
    matricula: 1
  };

  reposicion: Reposicion = {
  };

  edit: boolean = false;
  checkbox: boolean = false;
  busca: boolean = false;
  checkbox2: boolean = false;
  numberofnew: number=0;
  vectorofnew: New[] = [];
  calles: any = [];
  codigo: any;
  tasks: DataSource;

  constructor(private contenedoresService: ContenedoresService, private router: Router, private activatedroute: ActivatedRoute) { }

  async ngOnInit() {
    const result = await this.getMatriculas();
    var today = new Date();
    
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var today2 = dd + '/' + mm + '/' + yyyy;
    this.contenedor.fechinatala=today2;
    this.contenedoresService.getNextID().subscribe(
      res =>{
        var myJSON = JSON.stringify(res);
        var a = myJSON.substring(19,myJSON.length-2);
        this.contenedor.matricula = +a;
        }
      )
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
    }

    this.tasks = new DataSource({
      store: new ArrayStore({
          key: "codigo",
          data: this.calles
      })
    });
  }

  public async getMatriculas(){
    return new Promise(resolve => {
      this.contenedoresService.getDenominaciones().subscribe(//que no sea asincrono
        res => {
          this.calles = res;
          resolve('ok');
        },
        err => console.error(err)
      );
    });
  }

  callDenominacion(value){
    let addedItems = value.addedItems;
    this.codigo=addedItems[0].codigo;
  }

  changecheckbox(){
    this.checkbox==false ? this.checkbox=true : this.checkbox=false;
    if(this.checkbox){
      this.reposicion.asignatario=this.reposicion.receptor;
      this.reposicion.DNIA=this.reposicion.DNIR;
    }else{
      this.reposicion.asignatario="";
      this.reposicion.DNIA="";
    }
  }

  buscador(){
    this.busca==false ? this.busca=true : this.busca=false;
    console.log(this.tasks)
  }

  addentrega(){
    var elnuevo: New = {}
    var parse1 = 'calle'+(this.numberofnew);
    var parse2 = 'numero'+(this.numberofnew);
    var parse3 = 'actividad'+(this.numberofnew);
    var parse4 = 'orden'+(this.numberofnew);
    var parse5 = 'capacidad'+(this.numberofnew);
    elnuevo.idCalle=(<HTMLInputElement>document.getElementById(parse1)).value;
    elnuevo.numCalle=(<HTMLInputElement>document.getElementById(parse2)).value;
    elnuevo.idActividad=(<HTMLInputElement>document.getElementById(parse3)).value;
    elnuevo.numOrden=(<HTMLInputElement>document.getElementById(parse4)).value;
    elnuevo.idCapacidad=(<HTMLInputElement>document.getElementById(parse5)).value;
    this.vectorofnew.push(elnuevo);
    this.numberofnew++;
  }

  saveNewContenedorCopia() {
    var elnuevo: New = {}
    var parse1 = 'calle'+(this.numberofnew);
    var parse2 = 'numero'+(this.numberofnew);
    var parse3 = 'actividad'+(this.numberofnew);
    var parse4 = 'orden'+(this.numberofnew);
    var parse5 = 'capacidad'+(this.numberofnew);
    elnuevo.idCalle=(<HTMLInputElement>document.getElementById(parse1)).value;
    elnuevo.numCalle=(<HTMLInputElement>document.getElementById(parse2)).value;
    elnuevo.idActividad=(<HTMLInputElement>document.getElementById(parse3)).value;
    elnuevo.numOrden=(<HTMLInputElement>document.getElementById(parse4)).value;
    elnuevo.idCapacidad=(<HTMLInputElement>document.getElementById(parse5)).value;
    this.vectorofnew.push(elnuevo);
    this.contenedor.fechinatala=this.contenedor.fechinatala.substring(6,10)+'-'+this.contenedor.fechinatala.substring(3,5)+'-'+this.contenedor.fechinatala.substring(0,2);
    if(this.checkbox){
      this.reposicion.asignatario=this.reposicion.receptor;
      this.reposicion.DNIA=this.reposicion.DNIR;
    }
    for(var i=0; i<this.numberofnew+1; i++){
      this.contenedor.idCalle=this.vectorofnew[i].idCalle;
      this.contenedor.numCalle=this.vectorofnew[i].numCalle;
      this.contenedor.idActividad=this.vectorofnew[i].idActividad;
      this.contenedor.numOrden=this.vectorofnew[i].numOrden;
      this.contenedor.idCapacidad=this.vectorofnew[i].idCapacidad;

      this.contenedoresService.saveContenedor(this.contenedor, this.reposicion)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err)
      )
    }
    
    this.firmar(this.reposicion.receptor);
  }

  firmar(receptor: string){
    this.router.navigate(['/contenedores/firma/',receptor]);
    //copia
  }

}
