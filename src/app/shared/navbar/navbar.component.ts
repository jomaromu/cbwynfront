import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  @ViewChild('bars', { static: true }) bars: ElementRef<HTMLElement>;
  @ViewChild('navResp', { static: true }) navResp: ElementRef<HTMLElement>;
  @ViewChild('contenedorPrincipal', { static: true }) contenedorPrincipal: ElementRef<HTMLElement>;
  @ViewChild('ulEntrar', { static: true }) ulEntrar: ElementRef<HTMLElement>;
  @ViewChild('ulItems', { static: true }) ulItems: ElementRef<HTMLElement>;
  @ViewChild('navPrincipal', { static: true }) navPrincipal: ElementRef<HTMLElement>;

  public flag = false;

  public logo: string;
  public objIdioma = {
    spain: null,
    england: null
  };

  public estadoUsuario = {
    ok: null,
    ruta: null
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private breakPointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {

    this.logo = environment.logo;
    this.objIdioma.spain = environment.spainFlag;
    this.objIdioma.england = environment.englandFlag;

    // chequear estado del usuario logueado
    this.checkLogueado();
    this.btnResponsivo();
  }

  // chequear estado del usuario logueado
  async checkLogueado(): Promise<any> {
    const token = localStorage.getItem('token');

    if (!token) {

      return;

    } else {

      const usuario = await this.usuarioService.decodificarToken(token).toPromise();

      // usuario logueado
      if (usuario.ok === true) {

        this.estadoUsuario.ok = true;
        const ruta = usuario.usuarioDBToken.usuarioDB.role;
        switch (ruta) {
          case 'CBWYNROLE':
            this.estadoUsuario.ruta = '/user-dashboard';
            break;
        }

      } else if (usuario.ok === false || usuario.ok === undefined || usuario.ok === null) {
        this.estadoUsuario.ok = false;
      }
    }
  }

  // salir del sistema
  salir(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/inicio']);
    } else {
      localStorage.removeItem('token');
      this.router.navigate(['/entrar']);
    }
  }

  // traducir pagina
  traduceIngles(e: Event): void {

    const googleSelect2: any = document.getElementsByClassName('goog-te-combo')[0];
    googleSelect2.value = 'en';
    googleSelect2.dispatchEvent(new Event('change'));

    // console.log(googleSelect2);
  }

  traduceEspaniol(e: Event): void {

    const googleSelect2: any = document.getElementsByClassName('goog-te-combo')[0];
    googleSelect2.value = 'es';
    googleSelect2.dispatchEvent(new Event('change'));

    // console.log(googleSelect2);
  }

  btnResponsivo(): void {

    const paddingTop = document.getElementById('paddingTop');

    const imgLogo = document.getElementById('imgLogo');
    const row = document.getElementById('row');
    const contenedorPrincipal = this.contenedorPrincipal.nativeElement;
    const navPrincipal = this.navPrincipal.nativeElement;
    const ulItems = this.ulItems.nativeElement;
    const ulEntrar = this.ulEntrar.nativeElement;

    const bars = this.bars.nativeElement;
    bars.classList.add('fas', 'fa-bars');
    bars.style.fontSize = '1.4rem';
    // bars.style.zIndex = `9999`;

    const ulNavbar = document.getElementsByClassName('ulNavbar');
    const arrayUlnavbar = Array.from(ulNavbar);

    paddingTop.style.height = `${navPrincipal.clientHeight}px`;
    // paddingTop.style.width = `100vh`;
    // paddingTop.style.zIndex = '-999';

    const navResp = this.navResp.nativeElement;
    navResp.style.position = 'fixed';
    navResp.style.left = `0px`;
    navResp.style.top = `${navPrincipal.clientHeight}px`;
    navResp.style.display = 'none';
    navResp.style.flexDirection = 'column';
    navResp.style.justifyContent = 'center';
    navResp.style.alignItems = 'center';
    navResp.style.width = '100vw';
    navResp.style.overflowY = 'scroll';

    setInterval(() => {
      navResp.style.height = `${window.innerHeight - navPrincipal.clientHeight}px`;
    }, 300);
    // navResp.style.height = 'auto';
    navResp.style.backgroundColor = 'white';
    navResp.style.border = '1px solid rgb(196, 196, 196)';
    // navResp.style.border = '1px solid red';
    navResp.style.zIndex = `9999`;
    navResp.style.overflowY = 'scroll';

    ulItems.style.flexDirection = 'column';
    ulItems.style.justifyContent = 'center';
    ulItems.style.alignItems = 'center';
    // ulItems.style.backgroundColor = 'blue';
    ulItems.style.width = '80%';
    ulItems.style.margin = '0px';
    ulItems.style.padding = '0px';


    ulEntrar.style.flexDirection = 'column';
    ulEntrar.style.justifyContent = 'center';
    ulEntrar.style.alignItems = 'center';
    // ulEntrar.style.backgroundColor = 'green';
    ulEntrar.style.width = '80%';
    ulEntrar.style.marginRight = '0px';
    ulEntrar.style.padding = '0px';

    this.breakPointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((state: BreakpointState) => {

        if (state.matches) {

          arrayUlnavbar.forEach((ulNav: any) => {
            ulNav.style.display = 'none';
          });

          // imgLogo.style.width = '50px';
          navPrincipal.style.height = '60px';

          // navPrincipal.style.flexDirection = 'column';
          ulItems.style.flexDirection = 'column';
          ulItems.style.width = '80%';

          ulEntrar.style.flexDirection = 'column';
          ulEntrar.style.width = '80%';


          bars.style.display = 'flex';
        } else {

          navPrincipal.style.height = '70px';
          // imgLogo.style.width = '60px';

          arrayUlnavbar.forEach((ulNav: any) => {
            ulNav.style.display = 'flex';
          });

          navPrincipal.style.flexDirection = 'row';
          ulItems.style.flexDirection = 'row';
          ulItems.style.width = 'auto';

          ulEntrar.style.flexDirection = 'row';
          ulEntrar.style.width = 'auto';
          bars.style.display = 'none';
          navResp.style.display = 'none';
          navPrincipal.append(ulItems, ulEntrar);
        }
      });

    this.breakPointObserver
      .observe(['(max-height: 404px)'])
      .subscribe((state: BreakpointState) => {

        if (state.matches) {
          ulItems.style.marginTop = `${navPrincipal.clientHeight}px`;
        } else {
          ulItems.style.margin = '0px';
        }
      });

    bars.addEventListener('click', () => {

      if (this.flag === false) {

        ulEntrar.style.display = 'flex';
        ulItems.style.display = 'flex';

        navResp.classList.remove('animate__fadeOut');
        navResp.classList.add('animate__fadeIn');
        navResp.style.display = 'flex';

        navResp.append(ulItems, ulEntrar);
        bars.classList.remove('fa-bars');
        bars.classList.add('fa-times');

        this.flag = true;
        // console.log(this.flag);

      } else {

        bars.classList.remove('fa-times');
        bars.classList.add('fa-bars');

        navResp.classList.add('animate__fadeOut');
        navResp.classList.remove('animate__fadeIn');

        setTimeout(() => {
          navResp.style.display = 'none';
        }, 500);
        this.flag = false;
        // console.log(this.flag);
      }
    });
  }

}
