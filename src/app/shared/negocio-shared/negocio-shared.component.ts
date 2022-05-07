import { ChangeDetectorRef, Component, Input, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { NegocioDB } from '../../interfaces/respuestas';
import { UsuarioService } from '../../services/usuario.service';
import { ProyectosService } from '../../services/proyectos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-negocio-shared',
  templateUrl: './negocio-shared.component.html',
  styleUrls: ['./negocio-shared.component.css']
})
export class NegocioSharedComponent implements OnInit {

  // la cantdiad de texto va basado en el size de la pagina
  @Input() categSimilar: NegocioDB[];
  @Input() idNegocio: string;
  @ViewChild('imgFavorito', { static: false }) imgFavorito: ElementRef<HTMLElement>;
  public cantTexto = 40;
  public cantDesc = 100;
  public heart = '../../../../assets/img/heart.svg';

  // negocios iniciales
  public negociosInicialTemp: NegocioDB[];
  public negocios: NegocioDB[];
  public restantes: NegocioDB[];
  public arrayTemp: NegocioDB[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private usuarioService: UsuarioService,
    private proyectoService: ProyectosService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.negocios = [];
    this.negociosInicialTemp = [];
  }

  ngOnInit(): void {
    this.negociosIniciales();
    this.cargarFavoritos();
  }

  reudceTexto(): void {
    this.breakpointObserver
      .observe(['(max-width: 1800px)'])
      .subscribe((state: BreakpointState) => {

        if (state.matches) {
          this.cantTexto = 40;
          this.cantDesc = 100;
        }
      });
  }

  verNegocio(idNegocio: string): void {

    this.route.queryParams.subscribe(queries => {
      this.router.navigate([`/negocio`], { queryParams: { id: idNegocio } });
    });
  }

  async paginacion(limite: number): Promise<any> {

    const divVerMas = document.getElementById('divVerMas');

    // const restantes = this.restantes.splice(0, limite);
    const restantes = this.negociosInicialTemp.splice(0, limite);
    this.negocios.push(...restantes);

    if (restantes.length <= 0) {
      // ocultar boton ver
      // quitar cargar data
      divVerMas.style.display = 'none';
      // console.log('no hay mas');
    } else {
      // quitar cargar data
      divVerMas.style.display = 'block';
      // this.negocios.push(...restantes);
    }
  }

  negociosIniciales(): void {

    const divVerMas = document.getElementById('divVerMas');
    const arrayTemp: any = this.categSimilar;

    for (const negocio of arrayTemp) {
      if (this.idNegocio !== negocio._id) {
        // console.log(negocio);
        this.negociosInicialTemp.push(negocio);
      }
    }

    // this.restantes = this.categSimilar.splice(0, 2);
    // const visibles = this.categSimilar;
    // this.negocios.push(...visibles);

    this.restantes = this.negociosInicialTemp.splice(0, 2);
    const visibles = this.negociosInicialTemp;
    // this.negocios.push(...visibles);
    this.negocios.push(...this.restantes);

    if (visibles.length <= 0) {
      divVerMas.style.display = 'none';
    } else {
      divVerMas.style.display = 'block';
    }

  }

  async cargarFavoritos(): Promise<any> {

    const token = localStorage.getItem('token');

    // corazon normal
    if (!token) {
      this.heart = '../../../../assets/img/heart.svg';
    } else {
      const usuario = await this.usuarioService.decodificarToken(token).toPromise();
      const idUsuario = usuario.usuarioDBToken.usuarioDB._id;

      const respFavs = await this.proyectoService.obtenerFavoritos(idUsuario).toPromise();
      // console.log(respFavs);

      if (respFavs.ok === true) {

        setTimeout(async () => {
          // const imgFavorito = this.imgFavorito.nativeElement;

          const imgFavoritoClass = document.getElementsByClassName('imgFavorito');
          const arrayImgFav = Array.from(imgFavoritoClass);

          for (let i = 0; i < this.categSimilar.length; i++) {

            if (!respFavs.favoritosDB[i]) {
              // imgFavoritoClass[i].setAttribute('src', '../../../../assets/img/heart.svg');
              // console.log('nook');
              return;
            }

            if (respFavs.favoritosDB[i]) {
              const respArray = arrayImgFav.filter((img: any) => {

                if (respFavs.favoritosDB[i].negocio === img.dataset.sectionvalue) {
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

  async favorito(e: any, idNegocio: string): Promise<any> {

    const token = localStorage.getItem('token');

    if (!token) {
      // no hay usuario logueado
      console.log('entrar para poder poner en favorito');
      this.router.navigate(['/entrar']);

    } else {
      const usuario = await this.usuarioService.decodificarToken(token).toPromise();
      const idUsuario = usuario.usuarioDBToken.usuarioDB._id;
      const fd = new FormData();
      fd.append('idNegocio', idNegocio);
      fd.append('idUsuario', idUsuario);

      // 1. buscar favorito
      const respBusqueda = await this.proyectoService.buscarFavorito(fd).toPromise();

      // existe favorito
      if (respBusqueda.ok === true && respBusqueda.existe === true) {

        const respBorrado = await this.proyectoService.eliminarFavorito(idUsuario, idNegocio).toPromise();
        if (respBorrado.ok === true) {
          e.target.setAttribute('src', '../../../../assets/img/heart.svg');
          console.log('favorito borrado');
        }
      }

      // no existe favorito
      if (respBusqueda.ok === true && respBusqueda.existe === false) {

        const respCreado = await this.proyectoService.crearFavorito(fd).toPromise();
        if (respCreado.ok === true) {
          e.target.setAttribute('src', '../../../../assets/img/heart2.gif');
          console.log('favorito creado');
        }
      }
    }

  }

  async contactar(e: any, idNegocio: string, negocio: any): Promise<any> {

    const token = localStorage.getItem('token');
    localStorage.setItem('statusCheck', 'true');


    if (!token) {
      this.router.navigate(['/entrar']);
    } else {

      const usuario = await this.usuarioService.decodificarToken(token).toPromise();
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
          alert.style.backgroundImage = 'linear-gradient(rgb(97, 196, 226), rgb(61, 176, 211))';
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
          titulo.innerText = `Contactar a este Emprendedor tendrá un cargo de: $7.50(USD)`;
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
            this.router.navigate(['/checkout'], { queryParams: { negocio: idNegocio } });
          });
        }
      }
    }
  }
}

