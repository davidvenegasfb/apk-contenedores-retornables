import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  preserveWhitespaces: true
})
export class AppComponent implements OnInit {

  title = 'frontend';

  constructor(private router: Router) {}

  ngOnInit() {}

  isHomeRoute() {
    let a: boolean = false;
    a = (this.router.url === '/contenedores/login');
    return !a;
  }
}
