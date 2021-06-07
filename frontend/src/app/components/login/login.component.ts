import { Component, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { ContenedoresService } from '../../services/contenedores.service';
import { ConstantsService } from '../../services/constants.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  u: any;

  constructor(private contenedoresService: ContenedoresService, private router: Router, private constant: ConstantsService) {}


  logIn(uname: any, pass: any) {
    this.constant.username = uname;
    if(uname==''){
      confirm("Faltan parámetros");
    }
    if(pass==''){
      confirm("Faltan parámetros");
    }
    this.contenedoresService.getLogIn(uname, pass).subscribe(
      res => {
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
