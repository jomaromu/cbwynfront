import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ProyectosService } from '../../../services/proyectos.service';
import { NegocioDB } from '../../../interfaces/respuestas';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css'],
})
export class NegocioComponent implements OnInit {
  @ViewChild('wrapNegocio', { static: true })
  wrapNegocio: ElementRef<HTMLElement>;

  public monto = 0;

  public negocio: NegocioDB;
  public categSimilar: NegocioDB[];
  public idNegocio: string;
  public srcTumbs: string;

  constructor(
    private poyectoService: ProyectosService,
    private route: ActivatedRoute,
    private router: Router,
    private breakPointObserver: BreakpointObserver,
    private usuarioService: UsuarioService
  ) {
    this.categSimilar = [];
    this.negocio = null;
  }

  ngOnInit(): void {
    this.scroll();
    this.getNegocioId();
  }

  // obtener negocio por id
  async getNegocioId(): Promise<any> {
    this.idNegocio = this.route.snapshot.queryParamMap.get('id');
    const negocio: NegocioDB = await this.poyectoService
      .obtenerNegocio(this.idNegocio)
      .toPromise();

    if (!negocio.negocioDB) {
      Swal.fire('Información', 'Negocio no disponible', 'info');
      this.router.navigate(['/negocios']);
    }

    if (negocio.ok === false) {
      Swal.fire('Información', 'Negocio no disponible', 'info');
      this.router.navigate(['/negocios']);
    } else {
      // console.log(negocio);
      this.negocio = negocio;

      // negocios con categoria similar
      this.negociosSimilares(this.negocio);
    }
  }

  async negociosSimilares(negocioActual: NegocioDB): Promise<any> {
    const categoriaActual = negocioActual.negocioDB.categoria;
    const todosLosNeg = await this.poyectoService.obtenerTodos().toPromise();
    const arrayTodos: Array<NegocioDB> = todosLosNeg.negocioDB;

    const catSimilar: any = arrayTodos.filter(
      (negocio: any) => negocio.categoria === categoriaActual
    );
    const excluidos = catSimilar.filter(
      (negExcluido: any) => negExcluido._id !== negocioActual.negocioDB._id
    );

    this.categSimilar.push(...catSimilar);
  }

  slide(e: any): void {
    const srcThumb = e.target.getAttribute('src');
    const imgPrincipal = document.getElementById('imgPrincipal');

    this.srcTumbs = srcThumb;

    imgPrincipal.setAttribute('src', srcThumb);
  }

  scroll(): void {
    window.scroll(0, 0);
  }

  async contactar(e: any, idNegocio: string, negocio: any): Promise<any> {
    const token = localStorage.getItem('token');
    localStorage.setItem('statusCheck', 'true');

    const monto = negocio.negocioDB.monto;

    if (monto >= 0 && monto <= 9999) {
      this.monto = 1.99;
    } else if (monto >= 10000 && monto <= 999999) {
      this.monto = 3.99;
    } else if (monto > 999999) {
      this.monto = 8.99;
    }

    if (!token) {
      this.router.navigate(['/entrar']);
    } else {
      const usuario = await this.usuarioService
        .decodificarToken(token)
        .toPromise();
      const idUsuario = usuario.usuarioDBToken.usuarioDB._id;

      const role = usuario.usuarioDBToken.usuarioDB.role;

      if (role === 'ADMINROLE') {
        console.log('permitido solo para CBWYNROLE');
      }

      if (role === 'CBWYNROLE') {
        if (negocio.negocioDB.usuario === idUsuario) {
          // soy yo mismo
          console.log('no puede contactar a su mismo usuario');
          Swal.fire(
            'Mensaje',
            'No puede contactar a su mismo usuario',
            'error'
          );
        } else {
          const body = document.body;
          const fondo = document.createElement('div');
          const alert = document.createElement('div');
          const wrapDescAlert = document.createElement('div');
          const divIcon = document.createElement('div');
          const i = document.createElement('i');
          const titulo = document.createElement('h3');
          const wrapButtons = document.createElement('div');
          const aceptar = document.createElement('div');
          const cancelar = document.createElement('div');

          // fondo
          fondo.style.position = 'fixed';
          fondo.style.top = '0px';
          fondo.style.left = '0px';
          fondo.style.backgroundColor = 'rgba(128, 128, 128, 0.3)';
          fondo.style.display = 'flex';
          fondo.style.justifyContent = 'center';
          fondo.style.alignItems = 'center';
          fondo.style.width = '100vw';
          fondo.style.height = '100vh';
          fondo.style.zIndex = '9999';

          // alert
          alert.classList.remove('animate__animated', 'animate__fadeOutUp');
          alert.classList.add('animate__animated', 'animate__fadeInDown');
          // alert.style.setProperty('--animate-duration', '0.4s');
          alert.style.width = '500px';
          alert.style.height = '250px';
          alert.style.backgroundImage =
            'linear-gradient(rgb(97, 196, 226), rgb(61, 176, 211))';
          alert.style.padding = '20px';
          alert.style.borderRadius = '20px';
          alert.style.boxShadow = '1px 3px 15px gray';

          // wrapDescAlert
          wrapDescAlert.style.width = '100%';
          wrapDescAlert.style.height = '100%';
          // wrapDescAlert.style.border = '1px solid white';
          wrapDescAlert.style.display = 'flex';
          wrapDescAlert.style.justifyContent = 'space-between';
          wrapDescAlert.style.flexDirection = 'column';

          // icon
          divIcon.style.width = '40px';
          divIcon.style.height = '40px';
          // divIcon.style.border = '1px solid white';
          divIcon.style.display = 'flex';
          divIcon.style.justifyContent = 'center';
          divIcon.style.alignItems = 'center';

          // i
          i.classList.add('fas', 'fa-exclamation-triangle');
          i.style.fontSize = '25px';
          i.style.color = 'rgb(234, 234, 234)';

          // titulo
          titulo.innerText = `Contactar a este Emprendedor tendrá un cargo de: $${this.monto}(USD)`;
          // titulo.style.border = '1px solid white';
          titulo.style.width = '100%';
          titulo.style.textAlign = 'center';
          titulo.style.fontSize = '1.3rem';
          titulo.style.fontWeight = '400';
          titulo.style.color = 'rgb(234, 234, 234)';
          titulo.style.fontFamily = '"Nunito Sans", sans-serif';

          // wrapButtons
          wrapButtons.style.width = '100%';
          // wrapButtons.style.border = '1px solid white';
          wrapButtons.style.display = 'flex';
          wrapButtons.style.justifyContent = 'space-evenly';
          wrapButtons.style.alignItems = 'center';

          // aceptar
          aceptar.innerHTML = `<span style="font-size: 1rem; color: rgb(234, 234, 234); font-weight: 900; font-family: 'Nunito Sans', sans-serif">Contactar</span>`;
          aceptar.style.width = '130px';
          aceptar.style.height = '40px';
          // aceptar.style.border = '1px solid white';
          aceptar.style.display = 'flex';
          aceptar.style.justifyContent = 'center';
          aceptar.style.alignItems = 'center';
          aceptar.style.backgroundColor = 'rgb(11, 147, 188)';
          aceptar.style.cursor = 'pointer';
          aceptar.style.transition = 'all 0.3s';

          // cancelar
          cancelar.innerHTML = `<span style="font-size: 1rem; color: rgb(234, 234, 234); font-weight: 900; font-family: 'Nunito Sans', sans-serif">Volver</span>`;
          cancelar.style.width = '130px';
          cancelar.style.height = '40px';
          // cancelar.style.border = '1px solid white';
          cancelar.style.display = 'flex';
          cancelar.style.justifyContent = 'center';
          cancelar.style.alignItems = 'center';
          cancelar.style.marginLeft = '25px';
          cancelar.style.backgroundColor = 'rgb(72, 79, 86)';
          cancelar.style.cursor = 'pointer';
          cancelar.style.transition = 'all 0.3s';

          wrapButtons.append(aceptar, cancelar);

          divIcon.append(i);

          wrapDescAlert.append(divIcon, titulo, wrapButtons);

          alert.append(wrapDescAlert);
          fondo.append(alert);
          body.append(fondo);

          // eventos hover
          aceptar.addEventListener('mouseenter', (event: any) => {
            aceptar.style.backgroundColor = 'rgb(3, 122, 155)';
          });
          aceptar.addEventListener('mouseleave', (event: any) => {
            aceptar.style.backgroundColor = 'rgb(11, 147, 188)';
          });

          cancelar.addEventListener('mouseenter', (event: any) => {
            cancelar.style.backgroundColor = 'rgb(44, 48, 53)';
          });
          cancelar.addEventListener('mouseleave', (event: any) => {
            cancelar.style.backgroundColor = 'rgb(72, 79, 86)';
          });

          // eventos para cancelar
          cancelar.addEventListener('click', (event: any) => {
            localStorage.removeItem('statusCheck');
            alert.classList.add('animate__fadeOutUp');
            alert.classList.remove('animate__fadeInDown');

            setTimeout(() => {
              fondo.style.display = 'none';
            }, 800);
          });

          // eventos para aceptar
          aceptar.addEventListener('click', (event: any) => {
            alert.classList.add('animate__fadeOutUp');
            alert.classList.remove('animate__fadeInDown');

            setTimeout(() => {
              fondo.style.display = 'none';
            }, 800);
            this.router.navigate(['/checkout'], {
              queryParams: { negocio: idNegocio },
            });
          });
        }
      }
    }
  }
}
