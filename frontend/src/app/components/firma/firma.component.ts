import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { ContenedoresService } from '../../services/contenedores.service';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css']
})

export class FirmaComponent implements OnInit {

  //parámetros iniciales
  params: any;
  today2: any;
  next: any;
  correo: any;
  checkbox: boolean = false;
  signatureImage;

  constructor(private contenedoresService: ContenedoresService, private router: Router, private activatedroute: ActivatedRoute) {
  }

  ngOnInit(){
    //guardamos el receptor
    this.params = this.activatedroute.snapshot.params.receptor;
    //obtenemos la fecha de hoy
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.today2 = dd + '/' + mm + '/' + yyyy;
  }

  //Cuando pulsamos el botón, si el checkbox está activado, guardará el archivo en PDF, y volverá a inicio
  guardar() {
    this.getnumber();
    if(this.checkbox){
      this.createPDF();
    }
    this.navigate();
  }

  //Obtener el siguiente número
  async getnumber(){
    this.contenedoresService.getNumber()
    .subscribe(
      res => {
        this.next = res;
      },
      err => console.log(err)
    )
  }

  //Crear el PDF
  createPDF(){
    let data = document.getElementById('print');
    html2canvas(data, {logging: true, allowTaint: false, useCORS: true, scrollY: -window.scrollY}).then(canvas => {
      const contentDataURL = canvas.toDataURL();
      //pdf = new jspdf('l', 'cm', 'a4'); // Generates PDF in landscape mode
      const pdf = new jsPDF('p', 'cm', 'a4'); // Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 3.5, 1, 13.5, 25);
      pdf.save('recibo'+this.next);
    });
  }

  //Cambio del checkbox
  changecheckbox(){
    this.checkbox==false ? this.checkbox=true : this.checkbox=false;
  }

  //Volvemos a inicio
  navigate(){
    this.router.navigate(['/contenedores/inicio/']);
  }

}
