import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProyectosService } from '../../../../services/proyectos.service';
import { filter, map } from 'rxjs/operators';
import { UsuarioRegistrado, NegocioDB } from '../../../../interfaces/respuestas';
import { UsuarioService } from '../../../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('codigo', { static: false }) codigo: ElementRef<HTMLElement>;

  public monto = 0;

  public idNegocio: string;
  public bandera = true;
  public negocio: any;
  public importe: number;
  public usuario: UsuarioRegistrado;
  public indicativo: any[];
  public contador = 0;
  public nuevoValor: any[] = [''];
  public valorTarjeta: any[] = [''];
  public valorAnio: any[] = [''];
  public valorMes: any[] = [''];
  public valorCVC: any[] = [''];

  public objNombre = {
    idMensaje: 0,
    estado: false,
    mensaje: '',
  };

  public objApellido = {
    idMensaje: 0,
    estado: false,
    mensaje: '',
  };

  public objCodigo = {
    idMensaje: 0,
    estado: false,
    mensaje: '',
    mensajeTel: '(Opcional)'
  };

  public objTel = {
    idMensaje: 0,
    estado: false,
    mensaje: '',
    mensajeTel: '(Opcional)'
  };

  public objTarjeta = {
    idMensaje: 0,
    estado: false,
    mensaje: '',
    mensajeTel: '(Opcional)'
  };

  public objMM = {
    idMensaje: 0,
    estado: false,
    mensaje: '',
    mensajeTel: '(Opcional)'
  };

  public objYY = {
    idMensaje: 0,
    estado: false,
    mensaje: '',
    mensajeTel: '(Opcional)'
  };

  public objCVC = {
    idMensaje: 0,
    estado: false,
    mensaje: '',
    mensajeTel: '(Opcional)'
  };

  public objCheck = {
    idMensaje: 0,
    estado: true,
  };

  constructor(
    private route: ActivatedRoute,
    private proyectoService: ProyectosService,
    private router: Router,
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.scroll();
    this.validarCheckout();
    this.cargarCodigoTel();
  }

  async validarCheckout(): Promise<any> {

    const statusCheck = localStorage.getItem('statusCheck');

    const token = localStorage.getItem('token');
    this.usuario = await this.usuarioService.decodificarToken(token).toPromise();

    if (!statusCheck) {
      this.router.navigate(['/negocios']);
    } else {

      this.route.queryParams.subscribe(async (paramNegocio) => {
        const negocio = await this.proyectoService.obtenerNegocio(paramNegocio.negocio).toPromise();

        if (negocio.ok === true) {

          this.negocio = negocio.negocioDB;
          // console.log(this.negocio);
          this.importe = this.geIimporte;

        } else if (negocio.ok === false) {
          this.router.navigate(['/negocios']);
          localStorage.removeItem('statusCheck');
        }
      });
    }

    // this.route.queryParams.subscribe(paramNegocio => {
    //   console.log(paramNegocio);
    // });
  }

  get geIimporte(): number {

    const monto = this.negocio.monto;

    if (monto >= 0 && monto <= 9999) {
      this.monto = 1.99;
    } else if (monto >= 10000 && monto <= 999999) {
      this.monto = 3.99;
    } else if (monto > 999999) {
      this.monto = 8.99;
    }

    // const monto = this.negocio.monto;
    // const importe = (monto * 0.001);
    return this.monto;
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

  validaApellido(e: string): void {
    const cantValue = e.length;

    if (cantValue >= 50) {
      this.objApellido.idMensaje = 1;
      this.objApellido.estado = true;
      this.objApellido.mensaje = 'Demasiados carácteres';

    } else if (cantValue <= 0) {
      this.objApellido.idMensaje = 2;
      this.objApellido.estado = true;
      this.objApellido.mensaje = 'El campo no debe estar vacío';

    } else {
      this.objApellido.estado = false;
      this.objNombre.idMensaje = 5;
    }
  }

  validarCodigoTel(e: any, inputTel: any): void {

    const value = e.value;
    const ubicacion: any = this.indicativo;

    const find = ubicacion.find(valor => valor.codigo === value);

    if (value === 'ninguno') {

      this.objCodigo.mensajeTel = '(Opcional)';
    }

    if (value === 'ninguno' && inputTel.value.length >= 0) {
      this.objTel.estado = false;
      this.objCodigo.estado = false;
      inputTel.value = '';
    }

    if (value === 'ninguno' && inputTel.value.length <= 0) {
      this.objTel.estado = false;
      this.objCodigo.estado = false;
      this.objCodigo.idMensaje = 5;

    }

    if (!find) {
      return;
    } else {

      if (inputTel.value.length <= 0) {
        this.objTel.idMensaje = 1;
        this.objTel.estado = true;
        this.objCodigo.estado = false;
        this.objCodigo.mensajeTel = 'Obligatorio';
        this.objTel.mensaje = 'Escriba un número';
      }

      if (inputTel.value.length > 0) {
        this.objCodigo.estado = false;
        this.objCodigo.idMensaje = 5;
      }
    }
  }

  validaTel(e: any, selecTCodigo: any): void {

    const valor: string = e.target.value;
    const expReg = new RegExp('^[0-9]+$');

    if (expReg.test(valor) === false) {

      e.target.value = this.nuevoValor[0];

      if (valor.length <= 0 && (selecTCodigo.value !== undefined || selecTCodigo.value !== 'ninguno')) {
        this.objTel.idMensaje = 1;
        this.objTel.estado = true;
        this.objTel.mensaje = 'Escriba un número';
      }

      if (valor.length <= 0 && selecTCodigo.value === 'ninguno') {
        this.objTel.idMensaje = 5;
        this.objTel.estado = false;
        this.objCodigo.estado = false;
      }

    } else {

      this.nuevoValor[0] = valor;

      if (valor.length <= 1) {
        this.nuevoValor[0] = '';
      }

      if (selecTCodigo.value === undefined || selecTCodigo.value === 'ninguno') {
        this.objCodigo.idMensaje = 3;
        this.objCodigo.estado = true;
        this.objCodigo.mensaje = 'Elija un código';
      }

      if (valor.length > 0 && (selecTCodigo.value !== 'ninguno' || selecTCodigo.value !== undefined)) {
        this.objTel.idMensaje = 5;
        this.objTel.estado = false;
      }
    }
  }

  validartarjeta(e: any): void {

    const valor: string = e.target.value;
    const expReg = new RegExp('^[0-9]+$');

    if (expReg.test(valor) === false) {

      e.target.value = this.valorTarjeta[0];

    } else {

      this.valorTarjeta[0] = valor;

      if (valor.length <= 1) {
        this.valorTarjeta[0] = '';
      }

      if (valor.length > 15) {
        // e.target.value = this.valorTarjeta[0];
        const val = Array.from(this.valorTarjeta[0]);
        const recorte = val.splice(0, 16);
        const data = recorte.join('');
        e.target.value = data;
      }

      if (valor.length < 16) {
        this.objTarjeta.estado = true;
        this.objTarjeta.idMensaje = 1;
        this.objTarjeta.mensaje = 'Mínimo 16 carácteres';
      }

      if (valor.length === 16) {
        this.objTarjeta.estado = false;
      }

    }
  }

  validarMes(e: any): void {

    const valor: string = e.target.value;
    const expReg = new RegExp('^[0-9]+$');

    if (expReg.test(valor) === false) {

      e.target.value = this.valorMes[0];

    } else {

      this.valorMes[0] = valor;

      if (valor.length <= 1) {
        this.valorMes[0] = '';
      }

      if (valor.length > 2) {
        // e.target.value = this.valorMes[0];
        const val = Array.from(this.valorMes[0]);
        const recorte = val.splice(0, 2);
        const data = recorte.join('');
        e.target.value = data;
      }

      if (valor.length < 2) {
        this.objMM.estado = true;
        this.objMM.idMensaje = 1;
      }

      if (valor.length === 2) {
        this.objMM.estado = false;
      }

    }
  }

  validarAnio(e: any): void {

    const valor: string = e.target.value;
    const expReg = new RegExp('^[0-9]+$');

    if (expReg.test(valor) === false) {

      e.target.value = this.valorAnio[0];

    } else {

      this.valorAnio[0] = valor;

      if (valor.length <= 1) {
        this.valorAnio[0] = '';
      }

      if (valor.length > 4) {
        // e.target.value = this.valorAnio[0];
        const val = Array.from(this.valorAnio[0]);
        const recorte = val.splice(0, 4);
        const data = recorte.join('');
        e.target.value = data;
      }

      if (valor.length < 4) {
        this.objYY.estado = true;
        this.objYY.idMensaje = 1;
      }

      if (valor.length === 4) {
        this.objYY.estado = false;
        this.objYY.idMensaje = 1;
      }

    }
  }

  validarCVC(e: any): void {

    const valor: string = e.target.value;
    const expReg = new RegExp('^[0-9]+$');

    if (expReg.test(valor) === false) {

      e.target.value = this.valorCVC[0];

    } else {

      this.valorCVC[0] = valor;

      if (valor.length <= 1) {
        this.valorCVC[0] = '';
      }

      if (valor.length > 3) {
        // e.target.value = this.valorCVC[0];
        const val = Array.from(this.valorCVC[0]);
        const recorte = val.splice(0, 3);
        const data = recorte.join('');
        e.target.value = data;
      }

      if (valor.length < 3) {
        this.objCVC.estado = true;
        this.objCVC.idMensaje = 1;
      }

      if (valor.length === 3) {
        this.objCVC.estado = false;
      }

    }
  }

  checkPoliticas(e: any): void {

    const estadoCheck = e.target.checked;
    const aTerminos = document.getElementsByClassName('aTerminos');

    if (estadoCheck === false) {
      this.objCheck.estado = true;
      const arrayTerminos = Array.from(aTerminos);
      arrayTerminos.forEach((ele: any) => {
        ele.style.color = 'tomato';
      });
    }

    if (estadoCheck === true) {
      this.objCheck.estado = false;
      this.objCheck.idMensaje = 1;
      const arrayTerminos = Array.from(aTerminos);
      arrayTerminos.forEach((ele: any) => {
        ele.style.color = 'rgb(63, 63, 63)';
      });
    }

  }

  procesarPago(e: Event, negocio: any): void {


    // ruta negocio docs
    const splitDoc: any[] = negocio.docs[0].split('\\');
    const pathNegocio = `${splitDoc[splitDoc.length - 2]}/${splitDoc[splitDoc.length - 1]}`;

    const usuario = this.usuario.usuarioDBToken.usuarioDB;
    // console.log(this.usuario.usuarioDBToken.usuarioDB);
    // console.log(negocio);

    const objDatatUsuario = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      idNegocio: negocio._id,
      pathNegocio,
      codigoTel: negocio.codigoTel,
      numeroTel: negocio.numeroTel
    };

    const data = new FormData();

    data.append('nombreUsuario', `${objDatatUsuario.nombre}`);
    data.append('apellidoUsuario', `${objDatatUsuario.apellido}`);
    data.append('correoUsuario', `${objDatatUsuario.correo}`);
    data.append('idNegocio', `${objDatatUsuario.idNegocio}`);
    data.append('pathNegocio', `${objDatatUsuario.pathNegocio}`);

    // this.proyectoService.correoContacto(data)
    //   .subscribe(resp => {
    //     console.log(resp);
    //   });

    const aTerminos = document.getElementsByClassName('aTerminos');
    const checkPoliticas: any = document.getElementById('checkPoliticas');
    const checkPol = checkPoliticas.checked;

    if (this.objNombre.idMensaje === 0) {
      this.objNombre.idMensaje = 2;
      this.objNombre.estado = true;
      this.objNombre.mensaje = 'El campo no debe estar vacío';
    }

    if (this.objApellido.idMensaje === 0) {
      this.objApellido.idMensaje = 2;
      this.objApellido.estado = true;
      this.objApellido.mensaje = 'El campo no debe estar vacío';
    }

    if (this.objTarjeta.idMensaje === 0) {
      this.objTarjeta.idMensaje = 1;
      this.objTarjeta.estado = true;
      this.objTarjeta.mensaje = 'Mínimo 16 carácteres';
    }

    if (this.objMM.idMensaje === 0) {
      this.objMM.idMensaje = 1;
      this.objMM.estado = true;
    }

    if (this.objYY.idMensaje === 0) {
      this.objYY.idMensaje = 1;
      this.objYY.estado = true;
    }

    if (this.objCVC.idMensaje === 0) {
      this.objCVC.idMensaje = 1;
      this.objCVC.estado = true;
    }

    if (checkPol === true) {
      const arrayTerminos = Array.from(aTerminos);
      arrayTerminos.forEach((ele: any) => {
        ele.style.color = 'rgb(63, 63, 63)';
      });

    } else {
      const arrayTerminos = Array.from(aTerminos);
      arrayTerminos.forEach((ele: any) => {
        ele.style.color = 'tomato';
      });
    }

    if (
      this.objNombre.estado === false &&
      this.objApellido.estado === false &&
      this.objCodigo.estado === false &&
      this.objTel.estado === false &&
      this.objTarjeta.estado === false &&
      this.objMM.estado === false &&
      this.objYY.estado === false &&
      this.objCVC.estado === false &&
      this.objCheck.estado === false
    ) {
      // console.log('ok');
      // const data = new FormData();
      // mensaje temporal (quitar cuando existan las apis)
      Swal.fire({
        title: `En estos momentos no podemos procesar pagos, sin embargo puede contactarnos a través del formulario de contacto`,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: `Formulario de contacto`,
        cancelButtonText: 'Regresar'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          this.router.navigate(['/contacto']);
        } else if (result.isDenied) {
          return;
        }
      });
    }
  }

  cargarCodigoTel(): void {

    const url = `../../../../../assets/json/ubicacion.json`;
    this.http.get(url).subscribe((data: any) => {
      this.indicativo = data;
      // console.log(this.indicativo);
    });
  }

  scroll(): void {
    window.scroll(0, 0);
  }

}
