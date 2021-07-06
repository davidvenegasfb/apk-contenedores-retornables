import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContenedoresService } from '../../services/contenedores.service';
import { ConstantsService } from '../../services/constants.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //usuario
  u: any;

  constructor(private contenedoresService: ContenedoresService, private router: Router, private constant: ConstantsService) {}

  logIn(uname: any, pass: any) {
    //guardamos uname como la variable de sistema username, para saber quien realizará las acciones posteriores
    this.constant.username = uname;
    //comprueba que los campos no estén vacíos
    if(uname==''){
      confirm("Faltan parámetros");
    }
    if(pass==''){
      confirm("Faltan parámetros");
    }
    //se ejecuta cuando pulsamos el botón
    this.contenedoresService.getLogIn(uname, pass).subscribe(
      res => {
        //si no existe, u será vacío y dará error
        this.u = res;
        if(this.u!=null){
          this.router.navigate(['/contenedores/inicio/']);
        }else{
          confirm("Error en login");
        }
      },
      err => {
        err => console.error(err)
      }
    )
  }

}
