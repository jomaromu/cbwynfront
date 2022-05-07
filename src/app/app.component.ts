import { Component, OnInit, AfterViewInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { UsuarioService } from './services/usuario.service';
import { NavigationEnd, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Traductor } from './scripts/traductor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'cbwyn';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private traductor: Traductor
  ) {}

  ngOnInit(): void {
    // actualizar token cada vez que se carga una vista
    // tslint:disable-next-line: deprecation
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.checkStatusLogin();
      }
    });
    this.traductor.traducePagina();
  }

  // metodo que:
  // 1. chequea en todo momento el estado del usuario
  // 2. actualiza el token en cada ruta
  async checkStatusLogin(): Promise<any> {
    this.usuarioService.actualizarToken();
  }

  ngAfterViewInit(): void {
    this.scripts();
  }

  scripts(): void {

    return
    const cajaDeBusqueda = setInterval(() => {
      const navbarExpand: any =
        document.getElementsByClassName('navbar-expand')[0];
      const formInline: any = document.getElementsByClassName('form-inline')[0];
      const navLink: any = document.getElementsByClassName('nav-link')[0];
      const i = navLink.querySelector('.fa-bars');
      formInline.style.display = 'none'; // caja de busqueda
      i.style.color = 'black';

      if (!formInline) {
        clearInterval(cajaDeBusqueda);
      } else {
        formInline.style.display = 'none'; // caja de busqueda
        clearInterval(cajaDeBusqueda);
      }
    }, 10);

    const detectPadding = setInterval(() => {
      const navbarExpand: any =
        document.getElementsByClassName('navbar-expand')[0];
      const formInline: any = document.getElementsByClassName('form-inline')[0];
      const navLink: any = document.getElementsByClassName('nav-link')[0];
      const i = navLink.querySelector('.fa-bars');

      formInline.style.display = 'none'; // caja de busqueda
      i.style.color = 'black';

      const paddingTop = document.getElementById('paddingTop');

      if (!paddingTop || paddingTop.clientHeight === 0) {
        navbarExpand.style.marginTop = '60px';
        clearInterval(detectPadding);
      } else {
        clearInterval(detectPadding);
      }
    }, 10);
  }
}
