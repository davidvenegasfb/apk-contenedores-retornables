import { Component,  HostBinding } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})

export class BuscarComponent {

  @HostBinding('class') classes = 'row';

  calles: any = [];
  tasks: DataSource;

  constructor(private router: Router, private contenedoresService: ContenedoresService) {}

  async ngOnInit() {
    const result = await this.getMatriculas();
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

  buscar(calle: any, numero: any) {
    if (numero==''){ 
      this.router.navigate(['/contenedores/vista1/?'], { queryParams: { calle } });
    }else{
      this.router.navigate(['/contenedores/vista2/?/?'], { queryParams: { calle, numero } });
    }
  }
}
