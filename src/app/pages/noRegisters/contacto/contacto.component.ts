import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import Swal from 'sweetalert2';
import { ProyectosService } from '../../../services/proyectos.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  @ViewChild('nombre', { static: true }) nombre: ElementRef;
  @ViewChild('correo', { static: true }) correo: ElementRef;
  @ViewChild('mensaje', { static: true }) mensaje: ElementRef;

  public objNombre = {
    idMensaje: 0,
    estado: false,
    mensaje: '',
  };

  public objCorreo = {
    idMensaje: 0,
    estado: false,
    mensaje: '',
  };

  public objMensaje = {
    idMensaje: 0,
    estado: false,
    mensaje: '',
  };

  constructor(
    private breakPointObserver: BreakpointObserver,
    private proyectoService: ProyectosService
  ) { }

  ngOnInit(): void {
    this.paddingTop();
  }

  paddingTop(): void {

    const paddingTop = document.getElementById('paddingTop');
    paddingTop.style.display = 'none';

    // setInterval(() => {
    //   this.breakPointObserver.observe(['(max-width: 1400px)'])
    //     .subscribe((state: BreakpointState) => {
    //       const wrapContact = document.getElementById('wrapContact');
    //       if (state.matches) {
    //         wrapContact.style.height = `${window.innerHeight - 70}px`;
    //       }
    //       wrapContact.style.height = `${window.innerHeight - 70}px`;
    //     });
    // }, 300);
  }

  validaNombre(e: string): void {
    const cantValue = e.length;

    if (cantValue >= 50) {
      this.objNombre.idMensaje = 1;
      this.objNombre.estado = true;
      this.objNombre.mensaje = 'Demasiados carácteres';

    } else if (cantValue <= 0) {
      this.objNombre.idMensaje = 2;
      this.objNombre.estado = true;
      this.objNombre.mensaje = 'El campo no debe estar vacío';

    } else {
      this.objNombre.estado = false;
      this.objNombre.idMensaje = 5;
    }
  }

  validaCorreo(e: string): void {

    const cantValue = e.length;
    const pathReg = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');

    if (cantValue >= 50) {
      this.objCorreo.idMensaje = 1;
      this.objCorreo.estado = true;
      this.objCorreo.mensaje = 'Demasiados carácteres';

    } else if (cantValue <= 0) {
      this.objCorreo.idMensaje = 2;
      this.objCorreo.estado = true;
      this.objCorreo.mensaje = 'El campo no debe estar vacío';

    } else if (cantValue > 0 && cantValue <= 50) {

      const esCorreo = pathReg.test(e.toLowerCase());

      if (esCorreo === true) {
        this.objCorreo.estado = false;
        this.objCorreo.idMensaje = 5;

      } else {
        this.objCorreo.estado = true;
        this.objCorreo.idMensaje = 3;
        this.objCorreo.mensaje = `Correo invalido`;
      }
    }
  }

  validarMensaje(e: string): void {
    const cantValue = e.length;

    if (cantValue >= 300) {
      this.objMensaje.idMensaje = 1;
      this.objMensaje.estado = true;
      this.objMensaje.mensaje = 'Demasiados carácteres';

    } else if (cantValue <= 0) {
      this.objMensaje.idMensaje = 2;
      this.objMensaje.estado = true;
      this.objMensaje.mensaje = 'El campo no debe estar vacío';

    } else {
      this.objMensaje.estado = false;
      this.objMensaje.idMensaje = 5;
    }
  }

  enviarMensaje(e: Event): void {

    if (this.objNombre.idMensaje === 0) {
      this.objNombre.idMensaje = 2;
      this.objNombre.estado = true;
      this.objNombre.mensaje = 'El campo no debe estar vacío';
    }

    if (this.objCorreo.idMensaje === 0) {
      this.objCorreo.idMensaje = 2;
      this.objCorreo.estado = true;
      this.objCorreo.mensaje = 'El campo no debe estar vacío';
    }

    if (this.objMensaje.idMensaje === 0) {
      this.objMensaje.idMensaje = 2;
      this.objMensaje.estado = true;
      this.objMensaje.mensaje = 'El campo no debe estar vacío';
    }

    if (
      this.objNombre.estado === false &&
      this.objCorreo.estado === false &&
      this.objMensaje.estado === false
    ) {

      const data = new FormData();
      const nombre = this.nombre.nativeElement;
      const correo = this.correo.nativeElement;
      const mensaje = this.mensaje.nativeElement;

      data.append('nombre', `${nombre.value}`);
      data.append('correo', `${correo.value.toLowerCase()}`);
      data.append('mensaje', `${mensaje.value}`);

      const body = document.body;
      const fondo = document.createElement('div');
      const loading = document.createElement('img');
      fondo.style.position = 'fixed';
      fondo.style.top = '0px';
      fondo.style.left = '0px';
      fondo.style.width = '100vw';
      fondo.style.height = '100vh';
      fondo.style.display = 'flex';
      fondo.style.justifyContent = 'center';
      fondo.style.alignItems = 'center';
      fondo.style.backgroundColor = 'rgba(199, 199, 199, 0.3)';
      fondo.style.zIndex = '9999';

      loading.setAttribute('src', '../../../../assets/img/loading.gif');
      loading.style.width = '70px';

      fondo.append(loading);
      body.append(fondo);

      setInterval(() => {
        fondo.style.width = '100vw';
        fondo.style.height = '100vh';
      }, 300);

      this.proyectoService.correoPlataforma(data)
        .subscribe(resp => {

          if (resp.ok === true) {

            fondo.style.display = 'none';
            setTimeout(() => {
              Swal.fire(
                'Mensaje',
                'Gracias por su mensaje, muy pronto nos pondremos en contacto con usted',
                'info'
              );
            }, 300);

            nombre.value = '';
            correo.value = '';
            mensaje.value = '';
          }

          if (resp.ok === false) {
            fondo.style.display = 'none';
            setTimeout(() => {
              Swal.fire(
                'Mensaje',
                'Parece que hay un error, intentelo más tarde',
                'error'
              );
            }, 300);

            nombre.value = '';
            correo.value = '';
            mensaje.value = '';
          }
        });
    }


  }
}
