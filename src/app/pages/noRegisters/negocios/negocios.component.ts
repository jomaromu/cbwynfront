import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';

import { ProyectosService } from '../../../services/proyectos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { NegocioDB } from '../../../interfaces/respuestas';
import {
  CriterioBusquedaBanner,
  ObjCriterio,
} from '../../../interfaces/criterioBusqueda';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css'],
})
export class NegociosComponent implements OnInit {
  criterioBusqueda: CriterioBusquedaBanner;
  objetoCriterio: ObjCriterio;
  public monto = 0;

  @ViewChild('divBusqueda', { static: true })
  divBusqueda: ElementRef<HTMLElement>;
  @ViewChild('divPrincipal', { static: true })
  divPrincipal: ElementRef<HTMLElement>;
  @ViewChild('divInputBusqueda', { static: true })
  divInputBusqueda: ElementRef<HTMLElement>;
  @ViewChild('opcionPais', { static: true })
  opcionPais: ElementRef<HTMLElement>;
  @ViewChild('opcionCategoria', { static: true })
  opcionCategoria: ElementRef<HTMLElement>;
  @ViewChild('opcionCantidad', { static: true })
  opcionCantidad: ElementRef<HTMLElement>;
  @ViewChild('imgFavorito', { static: false })
  imgFavorito: ElementRef<HTMLElement>;

  // la cantdiad de texto va basado en el size de la pagina
  public cantTexto = 40;
  public cantDesc = 100;
  public arrayTemp: NegocioDB[];
  public nuevoArray: NegocioDB[];
  public idUsuario: string;
  public heart = '../../../../assets/img/heart.svg';

  public TodosLosNeg: NegocioDB[];
  public todos: NegocioDB[];
  public imgBanner: string;
  public tituloBanner: string;

  constructor(
    private proyectoService: ProyectosService,
    private usuarioService: UsuarioService,
    private proyectosService: ProyectosService,
    private route: ActivatedRoute,
    private breakPointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.TodosLosNeg = [];
    this.criterioBusqueda = {
      cantidad: null,
      categoria: null,
      ubicacion: null,
    };
  }

  ngOnInit(): void {
    this.scroll();
    this.responsivo();
    this.cargaNegociosInicial();
    this.proyectoService
      .getDataBusqueda()
      // tslint:disable-next-line: deprecation
      .subscribe((data) => {
        this.criterioBusqueda = data;
      });

    this.posicionDivBusqueda();
    this.cargarFavoritos();
  }

  reudceTexto(): void {
    this.breakPointObserver
      .observe(['(max-width: 1800px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.cantTexto = 40;
          this.cantDesc = 100;
        }
      });
  }

  posicionDivBusqueda(): void {
    window.addEventListener('scroll', (e) => {
      const divBusqueda = this.divBusqueda.nativeElement;
      const offset = divBusqueda.offsetTop;
      const scroll = document.scrollingElement.scrollTop;

      this.breakPointObserver
        .observe(['(max-width: 768px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            if (scroll >= 158) {
              divBusqueda.style.position = 'fixed';
              // divBusqueda.style.width = '700px';
              divBusqueda.style.top = '-35px';
            } else {
              divBusqueda.style.position = 'initial';
            }
          } else {
            if (scroll >= 208) {
              divBusqueda.style.position = 'fixed';
              // divBusqueda.style.width = '700px';
              divBusqueda.style.top = '-25px';
            } else {
              divBusqueda.style.position = 'initial';
            }
          }
        });

      this.breakPointObserver
        .observe(['(max-width: 576px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            // console.log(scroll);
            if (scroll >= 128) {
              divBusqueda.style.position = 'fixed';
              // divBusqueda.style.width = '700px';
              divBusqueda.style.top = '-45px';
            } else {
              divBusqueda.style.position = 'initial';
            }
          }
        });

      this.breakPointObserver
        .observe(['(max-width: 440px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            // console.log(scroll);
            if (scroll >= 105) {
              divBusqueda.style.position = 'fixed';
              // divBusqueda.style.width = '700px';
              divBusqueda.style.top = '-45px';
            } else {
              divBusqueda.style.position = 'initial';
            }
          }
        });

      this.breakPointObserver
        .observe(['(max-width: 400px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            // console.log(scroll);
            if (scroll >= 120) {
              divBusqueda.style.position = 'fixed';
              // divBusqueda.style.width = '700px';
              divBusqueda.style.top = '-60px';
            } else {
              divBusqueda.style.position = 'initial';
            }
          }
        });

      this.breakPointObserver
        .observe(['(max-width: 340px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            // console.log(scroll);
            if (scroll >= 105) {
              divBusqueda.style.position = 'fixed';
              // divBusqueda.style.width = '700px';
              divBusqueda.style.top = '-45px';
            } else {
              divBusqueda.style.position = 'initial';
            }
          }
        });
    });
  }

  busqueda(e: Event, pais: any, categoria: any, cantidad: any): void {
    // falta cantidad: any

    const valuePais = pais.value;
    const valueCategoria = categoria.value;
    const valueCantidad = cantidad.value;

    const divVerMas = document.getElementById('divVerMas');

    // console.log(cantidad.value);

    this.objetoCriterio = {
      ubicacion: valuePais,
      categoria: valueCategoria,
      cantidad: valueCantidad,
    };

    this.proyectoService
      .busqueda(this.objetoCriterio)
      .subscribe((data: any) => {
        // this.TodosLosNeg = data.negocioDB;
        const actual = data.negocioDB.splice(0, 5);
        const negocios = data.negocioDB;
        this.arrayTemp = [...negocios];

        // console.log(this.arrayTemp);

        if (this.arrayTemp.length <= 0) {
          divVerMas.style.display = 'none';
        } else {
          divVerMas.style.display = 'block';
        }

        this.TodosLosNeg = actual;
        // console.log(this.TodosLosNeg);

        this.cargarFavoritos();
        // console.log(actual);

        // console.log(data.negocioDB);
        // console.log(actual);
      });
  }

  verTodos(): void {
    const opcionPais: any = this.opcionPais.nativeElement;
    const opcionCategoria: any = this.opcionCategoria.nativeElement;
    const opcionCantidad: any = this.opcionCantidad.nativeElement;
    opcionPais.value = 'null';
    opcionCategoria.value = 'null';
    opcionCantidad.value = 'null';

    this.objetoCriterio = {
      ubicacion: 'null',
      categoria: 'null',
      cantidad: 'null',
    };

    const divVerMas = document.getElementById('divVerMas');

    this.proyectoService
      .busqueda(this.objetoCriterio)
      .subscribe((data: any) => {
        // this.TodosLosNeg = data.negocioDB;
        const actual = data.negocioDB.splice(0, 5);
        const negocios = data.negocioDB;
        this.arrayTemp = [...negocios];

        // if (this.arrayTemp.length <= 0) {
        //   divVerMas.style.display = 'none';
        // } else {
        //   divVerMas.style.display = 'block';
        // }

        this.TodosLosNeg = actual;
        this.cargarFavoritos();
      });
  }

  async cargaNegociosInicial(): Promise<any> {
    const token = localStorage.getItem('token');
    const data = await this.proyectoService.obtenerTodos().toPromise();

    if (!token) {
      this.arrayTemp = data.negocioDB;
      const actual = data.negocioDB.splice(0, 5);
      this.TodosLosNeg = actual;
    } else {
      const usuario = await this.usuarioService
        .decodificarToken(token)
        .toPromise();
      this.idUsuario = usuario.usuarioDBToken.usuarioDB._id;
      this.arrayTemp = data.negocioDB;
      const actual = data.negocioDB.splice(0, 5);
      this.TodosLosNeg = actual;
    }
  }

  async paginacion(limite: number): Promise<any> {
    const divVerMas = document.getElementById('divVerMas');
    const cantNegocios = this.arrayTemp.length;

    // || cantNegocios === this.arrayTemp.length
    if (cantNegocios <= 0) {
      // ocultar boton ver
      // quitar cargar data
      divVerMas.style.display = 'none';
      // console.log('no hay mas');
    } else {
      // quitar cargar data
      divVerMas.style.display = 'block';
      const arrayLocalTem = this.arrayTemp.splice(0, limite);
      this.TodosLosNeg.push(...arrayLocalTem);
    }

    const data = await this.proyectoService.obtenerTodos().toPromise();

    if (this.TodosLosNeg.length === data.negocioDB.length) {
      divVerMas.style.display = 'none';
    }

    this.cargarFavoritos();
  }

  verNegocio(idNegocio: string): void {
    this.route.queryParams.subscribe((queries) => {
      this.router.navigate([`/negocio`], { queryParams: { id: idNegocio } });
    });
  }

  responsivo(): void {
    const divPrincipal = this.divPrincipal.nativeElement;

    this.breakPointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          divPrincipal.style.marginTop = '20px';
        }
      });
  }

  scroll(): void {
    window.scroll(0, 0);
  }

  async favorito(e: any, idNegocio: string): Promise<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      // no hay usuario logueado
      console.log('entrar para poder poner en favorito');
      this.router.navigate(['/entrar']);
    } else {
      const usuario = await this.usuarioService
        .decodificarToken(token)
        .toPromise();
      const idUsuario = usuario.usuarioDBToken.usuarioDB._id;
      const fd = new FormData();
      fd.append('idNegocio', idNegocio);
      fd.append('idUsuario', idUsuario);

      // 1. buscar favorito
      const respBusqueda = await this.proyectoService
        .buscarFavorito(fd)
        .toPromise();

      // existe favorito
      if (respBusqueda.ok === true && respBusqueda.existe === true) {
        const respBorrado = await this.proyectoService
          .eliminarFavorito(idUsuario, idNegocio)
          .toPromise();
        if (respBorrado.ok === true) {
          e.target.setAttribute('src', '../../../../assets/img/heart.svg');
          console.log('favorito borrado');
        }
      }

      // no existe favorito
      if (respBusqueda.ok === true && respBusqueda.existe === false) {
        const respCreado = await this.proyectoService
          .crearFavorito(fd)
          .toPromise();
        if (respCreado.ok === true) {
          e.target.setAttribute('src', '../../../../assets/img/heart2.gif');
          console.log('favorito creado');
        }
      }
    }
  }

  async cargarFavoritos(): Promise<any> {
    const token = localStorage.getItem('token');

    // corazon normal
    if (!token) {
      this.heart = '../../../../assets/img/heart.svg';
    } else {
      const usuario = await this.usuarioService
        .decodificarToken(token)
        .toPromise();
      const idUsuario = usuario.usuarioDBToken.usuarioDB._id;

      const respFavs = await this.proyectoService
        .obtenerFavoritos(idUsuario)
        .toPromise();
      // console.log(respFavs);

      if (respFavs.ok === true) {
        setTimeout(async () => {
          const imgFavorito = this.imgFavorito.nativeElement;
          const idNegocio = imgFavorito.dataset.sectionvalue;

          const todosLosNeg = await this.proyectoService
            .obtenerTodos()
            .toPromise();
          const arrayNegs = todosLosNeg.negocioDB;

          const imgFavoritoClass =
            document.getElementsByClassName('imgFavorito');
          const arrayImgFav = Array.from(imgFavoritoClass);

          for (let i = 0; i < arrayNegs.length; i++) {
            if (!respFavs.favoritosDB[i]) {
              // imgFavoritoClass[i].setAttribute('src', '../../../../assets/img/heart.svg');
              // console.log('nook');
            }

            if (respFavs.favoritosDB[i]) {
              const respArray = arrayImgFav.filter((img: any) => {
                if (
                  respFavs.favoritosDB[i].negocio === img.dataset.sectionvalue
                ) {
                  return img;
                }
              });

              for (const img of respArray) {
                img.setAttribute('src', '../../../../assets/img/heart2.gif');
              }
            }
          }
        }, 100);
      }
    }
  }

  async contactar(e: any, idNegocio: string, negocio: any): Promise<any> {
    const monto = negocio.monto;
    console.log(typeof monto);

    const token = localStorage.getItem('token');
    localStorage.setItem('statusCheck', 'true');

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
        if (negocio.usuario === idUsuario) {
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
