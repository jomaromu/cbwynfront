import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

import { MsgErrores, CategUbicacion } from '../../../../interfaces/respuestas';
import { ProyectosService } from '../../../../services/proyectos.service';
import { UsuarioService } from '../../../../services/usuario.service';

import validator from 'validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-negocio',
  templateUrl: './nuevo-negocio.component.html',
  styleUrls: ['./nuevo-negocio.component.css']
})
export class NuevoNegocioComponent implements OnInit {

  @ViewChild('botonMov', { static: true }) botonMov: ElementRef<HTMLElement>;
  @ViewChild('spanMov', { static: true }) spanMov: ElementRef<HTMLElement>;

  @ViewChild('inputLogo', { static: true }) inputLogo: ElementRef;
  @ViewChild('inputPortada', { static: true }) inputPortada: ElementRef;
  @ViewChild('fondoNegro', { static: true }) fondoNegro: ElementRef<HTMLElement>;

  @ViewChild('progressBar', { static: true }) progressBar: ElementRef<HTMLElement>;
  @ViewChild('divBarra', { static: false }) divBarra: ElementRef<HTMLElement>;
  @ViewChild('btnSubmit', { static: true, read: ElementRef }) btnSubmit: ElementRef<HTMLButtonElement>;
  @ViewChild('btnPrev', { static: true, read: ElementRef }) btnPrev: ElementRef<HTMLButtonElement>;

  public imageChangedEvent: ImageCroppedEvent;
  public croppedImg: any = '';
  public croppedLogo: any = '';
  public croppedPortada: any = '';
  public croppedImg1: any = '';
  public croppedImg2: any = '';
  public croppedImg3: any = '';
  public thumbVideo: any = '';
  public archivos: any = '';

  public croppedSrc: any = '';
  public radioImg: number;

  private currentTab = 0;
  public forma: FormGroup;
  // public verSubmit = false;

  public validaNombre: MsgErrores;
  public validaDescripcion: MsgErrores;
  public validaTipoNeg: MsgErrores;
  public validaTiempoNeg: MsgErrores;
  public validaCat: MsgErrores;
  public validaUb: MsgErrores;
  public validaUt: MsgErrores;
  public validaReg: MsgErrores;
  public validaMonto: MsgErrores;
  public validaGarant: MsgErrores;
  public otrasNeg: MsgErrores;
  public validaLogo: MsgErrores;
  public validaPortada: MsgErrores;
  public validaImg1: MsgErrores;
  public validaImg2: MsgErrores;
  public validaImg3: MsgErrores;
  public validaVideo: MsgErrores;
  public validaArchivos: MsgErrores;
  public validaTelefono: MsgErrores;
  public validaCodigo: MsgErrores;
  public validaPagWeb: MsgErrores;

  public categorias: CategUbicacion;
  public ubicaciones: CategUbicacion;

  public objTipoNeg = [
    {
      nombre: 'Inversión',
      value: 'inn'
    },
    {
      nombre: 'Compra Venta',
      value: 'cmv'
    },
    {
      nombre: 'Sociedad',
      value: 'soc'
    },
    {
      nombre: 'Préstamo',
      value: 'inver'
    }
  ];

  public objTiempoNeg = [
    {
      nombre: 'Corto plazo',
      value: 'cp'
    },
    {
      nombre: 'Mediano plazo',
      value: 'mp'
    },
    {
      nombre: 'Largo plazo',
      value: 'lp'
    }
  ];

  constructor(
    private http: HttpClient,
    public sanitizer: DomSanitizer,
    private proyectoService: ProyectosService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {



    this.validaNombre = {
      mensaje: '',
      ok: null,
      valor: null
    };

    this.validaDescripcion = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaTipoNeg = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaTiempoNeg = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaMonto = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaCat = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaUb = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaUt = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaReg = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaGarant = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.otrasNeg = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaLogo = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaPortada = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaImg1 = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaImg2 = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaImg3 = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaVideo = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaArchivos = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaTelefono = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaCodigo = {
      mensaje: null,
      ok: null,
      valor: null
    };

    this.validaPagWeb = {
      mensaje: null,
      ok: null,
      valor: null
    };
  }

  ngOnInit(): void {

    this.smartWizard();
    // llamar las categorias
    this.http.get<CategUbicacion>('../../../../../assets/json/categoria.json')
      // tslint:disable-next-line: deprecation
      .subscribe((data: CategUbicacion) => {
        this.categorias = data;
      });

    // llamar a las ubicaciones
    this.http.get<CategUbicacion>('../../../../../assets/json/ubicacion.json')
      // tslint:disable-next-line: deprecation
      .subscribe((data: CategUbicacion) => {
        this.ubicaciones = data;
      });
  }

  // smartWizard
  smartWizard(): void {
    this.showTab(this.currentTab);
  }

  // mostrar los tabs
  showTab(currenTab: number): void {

    const btnAtras = document.getElementById('btnAtras');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const btnSubmit = document.getElementById('btnSubmit');

    // array de todos los tabs
    const arrayTabs: any = document.getElementsByClassName('tabs');

    // mostrar el tab actual
    arrayTabs[currenTab].style.display = 'block';

    // ocultar el boton de atras si estamos en el primer tab
    if (currenTab === 0) {

      btnAtras.style.display = 'none';

    } else {

      btnAtras.style.display = 'inline';
    }

    // si llega al final quitar boton siguiente y mostrar el de submit
    if (currenTab === (arrayTabs.length - 1)) {
      btnSiguiente.style.display = 'none';
      btnSubmit.style.display = 'inline';
    } else {
      btnSubmit.style.display = 'none';
      btnSiguiente.style.display = 'inline';
    }

  }

  // validar nombre
  validarNombre(e): void {

    const value: string = e.target.value;
    const valor = Array.from(value);

    if (valor.length < 2 || valor.length > 50) {
      this.validaNombre.ok = false;
      this.validaNombre.mensaje = 'Mínimo 2, máximo 50 carácteres';
    } else {
      this.validaNombre.ok = true;
      this.validaNombre.valor = value;
    }
  }

  // validar descripcion del negocio
  validarDesc(e): void {
    const value: string = e.target.value;
    const valor = Array.from(value);

    if (valor.length < 2 || valor.length > 1000) {
      this.validaDescripcion.ok = false;
      this.validaDescripcion.mensaje = 'Mínimo 2, máximo 1000 carácteres';
    } else {
      this.validaDescripcion.ok = true;
      this.validaDescripcion.valor = value;
    }
  }

  // validar tipo de negocio
  validarTipo(e): void {

    const value = e.value;

    const find = this.objTipoNeg.find(valor => valor.value === value);

    if (!find) {
      this.validaTipoNeg.ok = false;
      this.validaTipoNeg.mensaje = 'Elija una opción de la lista';
    } else {
      this.validaTipoNeg.ok = true;
      this.validaTipoNeg.valor = find.nombre;
    }
  }

  // validar tiempo
  validarTiempo(e): void {
    const value = e.value;

    const find = this.objTiempoNeg.find(valor => valor.value === value);

    if (!find) {
      this.validaTiempoNeg.ok = false;
      this.validaTiempoNeg.mensaje = 'Elija una opción de la lista';
    } else {
      this.validaTiempoNeg.ok = true;
      this.validaTiempoNeg.valor = find.nombre;
    }
  }

  // validacion del monto
  validarMonto(e): void {

    const valor: number = e.target.value;

    if (valor <= 0) {
      this.validaMonto.ok = false;
      this.validaMonto.mensaje = 'Ingrese un monto';
    } else {
      if (isNaN(Number(valor))) {
        this.validaMonto.mensaje = 'Debe escribir sólo números';
      } else {
        // const newValor = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(Number(valor));
        // const newValor = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(valor);
        // console.log(newValor);
        const newValor = Number(valor);
        this.validaMonto.ok = true;
        this.validaMonto.valor = newValor;
      }
    }

  }

  // validar select de categorias
  validarCategoria(e): void {
    const value = e.value;

    const categoria: any = this.categorias;

    const find = categoria.find(valor => valor.codigo === value);

    if (!find) {
      this.validaCat.ok = false;
      this.validaCat.mensaje = 'Elija una opción de la lista';
    } else {
      this.validaCat.ok = true;
      this.validaCat.valor = find.nombre;
    }
  }

  // validar select de ubicacion
  validarUbicacion(e): void {
    const value = e.value;

    const ubicacion: any = this.ubicaciones;

    const find = ubicacion.find(valor => valor.codigo === value);

    if (!find) {
      this.validaUb.ok = false;
      this.validaUb.mensaje = 'Elija una opción de la lista';
    } else {
      this.validaUb.ok = true;
      this.validaUb.valor = find.nombre;
    }
  }

  // validar utilidad
  validarUtilidad(e): void {
    const valor: number = e.target.value;

    if (valor <= 0) {
      this.validaUt.ok = false;
      this.validaUt.mensaje = 'Ingrese un monto';
    } else {
      if (isNaN(Number(valor))) {
        this.validaUt.mensaje = 'Debe escribir sólo números';
      } else {
        const newValor = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(Number(valor));
        this.validaUt.ok = true;
        this.validaUt.valor = newValor;
      }
    }
  }

  // validar tiempo de retorno
  validarRegreso(e): void { // REVISAR VALIDACION AQUI Y EN UTILDAD

    const valor: number = e.target.value;
    const value = validator.isDecimal(valor.toString(), { force_decimal: true, locale: 'en-US' });

    if (valor <= 0) {
      this.validaReg.ok = false;
      this.validaReg.mensaje = 'Ingrese cantidad de meses';
    } else {
      if (value === true) {
        this.validaReg.ok = false;
        this.validaReg.mensaje = 'Ingrese sólo números';
      } else {
        this.validaReg.ok = true;
        this.validaReg.valor = valor;
      }
    }

  }

  // validaar garantia
  validarGarantia(e): void {
    const value: string = e.target.value;
    const valor = Array.from(value);

    if (valor.length < 2 || valor.length > 100) {
      this.validaGarant.ok = false;
      this.validaGarant.mensaje = 'Mínimo 2, máximo 100 carácteres';
    } else {
      this.validaGarant.ok = true;
      this.validaGarant.valor = value;
    }
  }


  // otras
  otros(e): void {
    const value: string = e.target.value;
    const valor = Array.from(value);
    this.otrasNeg.ok = true;
    this.otrasNeg.valor = value;
  }

  // validaciones por parte de nexPrev
  validaNexPrev(): void {
    if (!this.validaNombre.ok) {
      this.validaNombre.ok = false;
      this.validaNombre.mensaje = 'Mínimo 2, máximo 50 carácteres';
    }

    if (!this.validaDescripcion.ok) {
      this.validaDescripcion.ok = false;
      this.validaDescripcion.mensaje = 'Mínimo 2, máximo 1000 carácteres';
    }

    if (!this.validaTipoNeg.ok) {
      this.validaTipoNeg.ok = false;
      this.validaTipoNeg.mensaje = 'Elija una opción de la lista';
    }

    if (!this.validaTiempoNeg.ok) {
      this.validaTiempoNeg.ok = false;
      this.validaTiempoNeg.mensaje = 'Elija una opción de la lista';
    }

    if (!this.validaMonto.ok) {
      this.validaMonto.ok = false;
      this.validaMonto.mensaje = 'Ingrese un monto';
    }

    if (!this.validaCat.ok) {
      this.validaCat.ok = false;
      this.validaCat.mensaje = 'Elija una opción de la lista';
    }

    if (!this.validaUb.ok) {
      this.validaUb.ok = false;
      this.validaUb.mensaje = 'Elija una opción de la lista';
    }

    if (!this.validaUt.ok) {
      this.validaUt.ok = false;
      this.validaUt.mensaje = 'Ingrese un monto';
    }

    if (!this.validaReg.ok) {
      this.validaReg.ok = false;
      this.validaReg.mensaje = 'Ingrese cantidad de meses';
    }

    if (!this.validaGarant.ok) {
      this.validaGarant.ok = false;
      this.validaGarant.mensaje = 'Bienes o fondos que respalden la negociación';
    }

    this.otrasNeg.ok = true;
    this.validaPagWeb.ok = true;
    this.validaLogo.ok = true;
    this.validaPortada.ok = true;
    this.validaImg1.ok = true;
    this.validaImg2.ok = true;
    this.validaImg3.ok = true;
    this.validaVideo.ok = true;

    if (!this.validaArchivos.ok) {
      this.validaArchivos.ok = false;
    }

    if (!this.validaTelefono.ok) {
      this.validaTelefono.ok = false;
    }

    const telefono: any = document.getElementById('telefono');
    if (!telefono.value) {
      this.validaTelefono.ok = false;
      this.validaTelefono.mensaje = 'Debe ingresar un número';
    }

    if (isNaN(telefono.value)) {
      this.validaTelefono.ok = false;
      this.validaTelefono.mensaje = 'Debe ingresar un número';
    }

    if (!this.validaCodigo.ok) {
      this.validaCodigo.ok = false;
      this.validaCodigo.mensaje = 'Elija una opción de la lista';
    }
  }

  // convertir base64 en file
  convertBase64ToFile(url, filename, mime): Promise<File> {
    mime = mime || (url.match(/^data:([^;]+);/) || '')[1];
    return (fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mime }))
    );
  }

  // ========================== CROP ========================== //
  // cierra la ventana del crop
  cerrarCropper(): void {
    const fondoNegro = this.fondoNegro.nativeElement;
    fondoNegro.style.display = 'none';
  }

  // guarda los crops
  imageCropped(e: ImageCroppedEvent): void {
    this.croppedImg = e.base64;
  }

  // boton para recortar los crops
  recotarImg(divImgCroppeImg, tipoImg, fondoNegro, validarImg, imgSrc): void {
    // const divImgCroppedLogo = document.getElementById('divImgCroppedLogo');
    // const fondoNegro = document.getElementById('fondoNegro');

    divImgCroppeImg.style.display = 'flex';
    fondoNegro.style.display = 'none';

    // guardar la imagen recortada

    if (this.croppedImg !== '') {
      // convetir base64 a file
      this.convertBase64ToFile(this.croppedImg, `${tipoImg}`, 'png')
        .then(file => {
          switch (imgSrc) {
            case 'logo':
              this.croppedLogo = this.croppedImg;
              if (!this.validaLogo.valor) {
                // enviar el avatar
              } else {
                this.validaLogo.valor = file;
              }
              break;
            case 'portada':
              this.croppedPortada = this.croppedImg;
              if (!this.validaPortada.valor) {
                // enviar el avatar
              } else {
                this.validaPortada.valor = file;
              }
              break;
            case 'img1':
              this.croppedImg1 = this.croppedImg;
              if (!this.validaImg1.valor) {
                // enviar el avatar
              } else {
                this.validaImg1.valor = file;
              }
              break;
            case 'img2':
              this.croppedImg2 = this.croppedImg;
              if (!this.validaImg2.valor) {
                // enviar el avatar
              } else {
                this.validaImg2.valor = file;
              }
              break;
            case 'img3':
              this.croppedImg3 = this.croppedImg;
              if (!this.validaImg3.valor) {
                // enviar el avatar
              } else {
                this.validaImg3.valor = file;
              }
              break;
          }
          validarImg.valor = file; // guardar el archivo en el valor de valida....
        })
        .catch(err => console.log(err));
    }
  }

  // ========================== TERMINA CROP ========================== //

  // ========================== LOGO ========================== //
  manejaLogo(e): void {

    const originalFiles = e.target.files[0];
    this.radioImg = 1 / 1;

    const fondoNegro = document.getElementById('fondoNegro');
    const divImgCroppedLogo = document.getElementById('divImgCroppedLogo');

    // verificar que viene una imagen
    if (originalFiles) {

      // validar los mimetypes
      if (originalFiles.type !== 'image/jpeg' && originalFiles.type !== 'image/jpg' && originalFiles.type !== 'image/png') {
        this.validaLogo.ok = false;
        this.validaLogo.valor = null; // poner el avatar
        this.validaLogo.mensaje = 'Permitidos(jpg, png jpeg)';

        // quitar la imagen thumb
        divImgCroppedLogo.style.display = 'none';

        return;
      } else {
        this.imageChangedEvent = e; // cargar el crop con la imagen
        this.validaLogo.ok = true;

        // cargar boton recortar
        const btnRecortar = document.getElementById('btnRecortar');
        btnRecortar.style.display = 'block';

        btnRecortar.addEventListener('click', (evt) => {
          this.recotarImg(divImgCroppedLogo, 'logo', fondoNegro, this.validaLogo, 'logo');
        }, { once: true });
      }
    }

    // si no hay cambios o nada cargado
    if (!originalFiles) {
      return;
    }

    fondoNegro.style.display = 'flex';
  }
  // ========================== TERMINA LOGO ========================== //

  // ========================== IMG1 ========================== //
  manejaImg1(e): void {

    const originalFiles = e.target.files[0];
    this.radioImg = 16 / 9;

    const fondoNegro = document.getElementById('fondoNegro');
    const divImgCroppedImg1 = document.getElementById('divImgCroppedImg1');

    // verificar que viene una imagen
    if (originalFiles) {

      // validar los mimetypes
      if (originalFiles.type !== 'image/jpeg' && originalFiles.type !== 'image/jpg' && originalFiles.type !== 'image/png') {
        this.validaImg1.ok = false;
        this.validaImg1.valor = null; // poner el avatar
        this.validaImg1.mensaje = 'Permitidos(jpg, png jpeg)';

        // quitar la imagen thumb
        divImgCroppedImg1.style.display = 'none';

        return;
      } else {
        this.imageChangedEvent = e; // cargar el crop con la imagen
        this.validaImg1.ok = true;

        // cargar boton recortar
        const btnRecortar = document.getElementById('btnRecortar');
        btnRecortar.style.display = 'block';

        btnRecortar.addEventListener('click', (evt) => {
          this.recotarImg(divImgCroppedImg1, 'img1', fondoNegro, this.validaImg1, 'img1');
        }, { once: true });
      }
    }

    // si no hay cambios o nada cargado
    if (!originalFiles) {
      return;
    }

    fondoNegro.style.display = 'flex';
  }
  // ========================== TERMINA IMG1 ========================== //

  // ========================== IMG2 ========================== //
  manejaImg2(e): void {

    const originalFiles = e.target.files[0];
    this.radioImg = 16 / 9;

    const fondoNegro = document.getElementById('fondoNegro');
    const divImgCroppedImg2 = document.getElementById('divImgCroppedImg2');

    // verificar que viene una imagen
    if (originalFiles) {

      // validar los mimetypes
      if (originalFiles.type !== 'image/jpeg' && originalFiles.type !== 'image/jpg' && originalFiles.type !== 'image/png') {
        this.validaImg2.ok = false;
        this.validaImg2.valor = null; // poner el avatar
        this.validaImg2.mensaje = 'Permitidos(jpg, png jpeg)';

        // quitar la imagen thumb
        divImgCroppedImg2.style.display = 'none';

        return;
      } else {
        this.imageChangedEvent = e; // cargar el crop con la imagen
        this.validaImg2.ok = true;

        // cargar boton recortar
        const btnRecortar = document.getElementById('btnRecortar');
        btnRecortar.style.display = 'block';

        btnRecortar.addEventListener('click', (evt) => {
          this.recotarImg(divImgCroppedImg2, 'img2', fondoNegro, this.validaImg2, 'img2');
        }, { once: true });
      }
    }

    // si no hay cambios o nada cargado
    if (!originalFiles) {
      return;
    }

    fondoNegro.style.display = 'flex';
  }
  // ========================== TERMINA IMG2 ========================== //

  // ========================== IMG3 ========================== //
  manejaImg3(e): void {

    const originalFiles = e.target.files[0];
    this.radioImg = 16 / 9;

    const fondoNegro = document.getElementById('fondoNegro');
    const divImgCroppedImg3 = document.getElementById('divImgCroppedImg3');

    // verificar que viene una imagen
    if (originalFiles) {

      // validar los mimetypes
      if (originalFiles.type !== 'image/jpeg' && originalFiles.type !== 'image/jpg' && originalFiles.type !== 'image/png') {
        this.validaImg3.ok = false;
        this.validaImg3.valor = null; // poner el avatar
        this.validaImg3.mensaje = 'Permitidos(jpg, png jpeg)';

        // quitar la imagen thumb
        divImgCroppedImg3.style.display = 'none';

        return;
      } else {
        this.imageChangedEvent = e; // cargar el crop con la imagen
        this.validaImg3.ok = true;

        // cargar boton recortar
        const btnRecortar = document.getElementById('btnRecortar');
        btnRecortar.style.display = 'block';

        btnRecortar.addEventListener('click', (evt) => {
          this.recotarImg(divImgCroppedImg3, 'img3', fondoNegro, this.validaImg3, 'img3');
        }, { once: true });
      }
    }

    // si no hay cambios o nada cargado
    if (!originalFiles) {
      return;
    }

    fondoNegro.style.display = 'flex';
  }
  // ========================== TERMINA IMG3 ========================== //

  // ========================== VIDEO ========================== //
  manejaVideo(e): void {
    const originalFiles = e.target.files[0];

    const fondoNegro = document.getElementById('fondoNegro');
    const divVideo = document.getElementById('divVideo');
    const videoTag: any = document.getElementById('video');
    const subirVideo: any = document.getElementById('subirVideo');
    let tiempo = 0;

    // si el tiempo es mayor a 60 segundos
    setTimeout(() => {
      tiempo = Math.round(videoTag.duration);


      if (tiempo >= 60) {

        this.validaVideo.ok = false;
        this.validaVideo.valor = null;
        this.validaVideo.mensaje = `El video no debe superar los 60 segundos`;

        subirVideo.value = null;

        // quitar el video del thumb
        divVideo.style.display = 'none';
        return;
      }
    }, 500);
    // verificar que venga un video
    if (originalFiles) {

      // tslint:disable-next-line: max-line-length
      if (originalFiles.type !== 'video/mp4' && originalFiles.type !== 'video/3gpp' && originalFiles.type !== 'video/x-ms-wmv' && originalFiles.type !== 'video/x-msvideo') {
        this.validaVideo.ok = false;
        this.validaVideo.valor = null; // poner el avatar video
        this.validaVideo.mensaje = 'Permitidos(mp4, 3gp, wmv, avi)';
        subirVideo.value = null;

        // quitar el video del thumb
        divVideo.style.display = 'none';

        return;
      } else {

        const reader = new FileReader();

        reader.onload = (evt) => {
          this.thumbVideo = evt.target.result;
          this.convertBase64ToFile(this.thumbVideo, 'video', 'mp4')
            .then(file => {
              this.validaVideo.valor = file;
              console.log(this.validaVideo.valor);
            }).catch(err => {
              console.log(err);
            });
          videoTag.load();
          divVideo.style.display = 'block';
        };

        reader.readAsDataURL(originalFiles);
        this.validaVideo.ok = true;
      }
    }

    // si no hay nada o no hay archivos cargados
    if (!originalFiles) {
      return;
    }
  }
  // ========================== TERMINA VIDEO ========================== //


  // ========================== PORTADA ========================== //
  manejaPortada(e): void {

    const originalFiles = e.target.files[0];
    this.radioImg = 16 / 9;

    const fondoNegro = document.getElementById('fondoNegro');
    const divImgCroppedPortada = document.getElementById('divImgCroppedPortada');

    // verificar que viene una imagen
    if (originalFiles) {

      // validar los mimetypes
      if (originalFiles.type !== 'image/jpeg' && originalFiles.type !== 'image/jpg' && originalFiles.type !== 'image/png') {
        this.validaPortada.ok = false;
        this.validaPortada.valor = null; // poner el avatar
        this.validaPortada.mensaje = 'Permitidos(jpg, png jpeg)';

        // quitar la imagen thumb
        divImgCroppedPortada.style.display = 'none';

        return;
      } else {
        this.imageChangedEvent = e; // cargar el crop con la imagen
        this.validaPortada.ok = true;

        // cargar boton recortar
        const btnRecortar = document.getElementById('btnRecortar');
        btnRecortar.style.display = 'block';

        btnRecortar.addEventListener('click', (evt) => {

          this.recotarImg(divImgCroppedPortada, 'portada', fondoNegro, this.validaPortada, 'portada');
        }, { once: true });
      }
    }

    // si no hay cambios o nada cargado
    if (!originalFiles) {
      return;
    }

    fondoNegro.style.display = 'flex';
  }
  // ========================== TERMINA PORTADA ========================== //

  // ========================== ARCHIVOS ========================== //
  manejaArchivos(e): void {
    const originalFiles = e.target.files[0];

    // verificar que viene una imagen
    if (originalFiles) {

      // validar los mimetypes
      if (originalFiles.type !== 'application/msword' && originalFiles.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && originalFiles.type !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation' && originalFiles.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && originalFiles.type !== 'application/pdf') {
        this.validaArchivos.ok = false;
        this.validaArchivos.valor = null; // poner el avatar

        return;
      } else {
        this.validaArchivos.valor = originalFiles;
        this.validaArchivos.ok = true;
      }
    }

    // si no hay cambios o nada cargado
    if (!originalFiles) {
      return;
    }
  }
  // ========================== TERMINA ARCHIVOS ========================== //

  // validar telefono
  validarTelefono(e): any {


    const telefono: any = document.getElementById('telefono');

    const value = validator.isNumeric(telefono.value);

    if (value === false) {
      this.validaTelefono.ok = false;
      this.validaTelefono.mensaje = 'Ingrese solo números';
      e.preventDefault();
    } else {

      this.validaTelefono.ok = true;
      this.validaTelefono.valor = telefono.value;
    }
  }

  // validar select de codigo telefono
  validarCodigoTel(e): void {
    const value = e.value;
    const ubicacion: any = this.ubicaciones;

    const find = ubicacion.find(valor => valor.indicativo === value);

    if (!find) {
      this.validaCodigo.ok = false;
      this.validaCodigo.mensaje = 'Elija una opción de la lista';
    } else {
      this.validaCodigo.ok = true;
      this.validaCodigo.valor = find.indicativo;
    }
  }

  // pagina web
  paginaWeb(e): void {
    const value: string = e.target.value;
    const valor = Array.from(value);
    this.validaPagWeb.ok = true;
    this.validaPagWeb.valor = value;
  }


  // hacia adelante o hacia atras de los tabs
  avanzaAtrasa(arrayTabs, tabNumber): void {

    // ocultar el tab anterior
    arrayTabs[this.currentTab].style.display = 'none';
    // incrementar el currentab en 1
    this.currentTab = this.currentTab + tabNumber;
    this.showTab(this.currentTab);
    // mover los indicadores
    this.moverIndicadores(this.currentTab, tabNumber);

  }

  // boton siguiente
  nextPrev(e, tabNumber: number): void {

    const arrayTabs: any = document.getElementsByClassName('tabs'); // array con los tabs

    // validaciones por parte de nexPrev
    this.validaNexPrev();

    // pasos del formulario
    if (tabNumber === 1) { // verifico que el usuario este avanzando
      switch (this.currentTab) {
        // primer tab
        case 0:
          // tslint:disable-next-line: max-line-length
          if (this.validaNombre.ok === true && this.validaDescripcion.ok === true && this.validaTipoNeg.ok === true && this.validaMonto.ok === true && this.validaCat.ok === true && this.validaUb.ok === true) { // valido que todos los campos del currenTab esten correctos falta && this.validaTiempoNeg.ok === true
            this.avanzaAtrasa(arrayTabs, tabNumber);
          }
          break;
        // segundo tab
        case 1:
          if (this.validaUt.ok === true && this.validaReg.ok === true && this.validaGarant.ok === true && this.otrasNeg.ok === true) {
            this.avanzaAtrasa(arrayTabs, tabNumber);
          }
          break;
        // tercer tab
        case 2:
          // tslint:disable-next-line: max-line-length
          if (this.validaLogo.ok === true && this.validaPortada.ok === true && this.validaImg1.ok === true && this.validaImg2.ok === true && this.validaImg3.ok === true && this.validaArchivos.ok === true) {
            this.avanzaAtrasa(arrayTabs, tabNumber);
          }
          break;
      }
    }

    if (tabNumber === -1) { // verifico que vaya hacia atras
      this.avanzaAtrasa(arrayTabs, tabNumber);
    }
  }

  // mover indicadores
  moverIndicadores(currenTab: number, tabNumber: number): void {

    // todos los indicadores
    const indicadores: any = document.getElementsByClassName('indicadores');

    // span de los textos del boton de movimiento
    const spanMov = this.spanMov.nativeElement;


    // boton indicador
    const botonMov = this.botonMov.nativeElement;
    const anchoIndicador = indicadores[currenTab].offsetWidth;

    const aumentaLeft = (currenTab * anchoIndicador);

    // mover boton
    // botonMov.style.marginLeft = `${aumentaLeft}px`;
    botonMov.style.transform = `translate3d(${aumentaLeft}px, 0px, 0px)`;
    botonMov.style.transition = 'all 0.5s';
    botonMov.style.transitionTimingFunction = 'cubic-bezier(0.29, 1.42, 0.79 1) 0s';
    spanMov.innerText = indicadores[currenTab].innerText;

    // efecto animate dependiendo del sentido
    if (tabNumber === 1) { }

  }

  // boton que publica el negocio
  async publicarNegocio(e): Promise<any> {

    this.validaNexPrev();

    if (
      this.validaNombre.ok === true &&
      this.validaDescripcion.ok === true &&
      this.validaTipoNeg.ok === true &&
      // this.validaTiempoNeg.ok === true &&
      this.validaMonto.ok === true &&
      this.validaCat.ok === true &&
      this.validaUb.ok === true &&
      this.validaUt.ok === true &&
      this.validaReg.ok === true &&
      this.validaGarant.ok === true &&
      this.otrasNeg.ok === true &&
      this.validaLogo.ok === true &&
      this.validaPortada.ok === true &&
      this.validaImg1.ok === true &&
      this.validaImg2.ok === true &&
      this.validaImg3.ok === true &&
      this.validaVideo.ok === true &&
      this.validaArchivos.ok === true &&
      this.validaTelefono.ok === true &&
      this.validaCodigo.ok === true &&
      this.validaPagWeb.ok === true
    ) {


      const token = localStorage.getItem('token');
      const tokenDecod = await this.usuarioService.decodificarToken(token).toPromise();

      const dataProyecto = new FormData();
      dataProyecto.append('nombre', this.validaNombre.valor);
      dataProyecto.append('descripcion', this.validaDescripcion.valor);
      dataProyecto.append('tipoNegocio', this.validaTipoNeg.valor);
      dataProyecto.append('tiempo', this.validaTiempoNeg.valor);
      dataProyecto.append('monto', this.validaMonto.valor);
      dataProyecto.append('categoria', this.validaCat.valor);
      dataProyecto.append('ubicacion', this.validaUb.valor);
      dataProyecto.append('utilidad', this.validaUt.valor);
      dataProyecto.append('retorno', this.validaReg.valor);
      dataProyecto.append('garantia', this.validaGarant.valor);
      dataProyecto.append('otras', this.otrasNeg.valor);
      dataProyecto.append('logo', this.validaLogo.valor);
      dataProyecto.append('portada', this.validaPortada.valor);
      dataProyecto.append('img', this.validaImg1.valor);
      dataProyecto.append('img', this.validaImg2.valor);
      dataProyecto.append('img', this.validaImg3.valor);
      dataProyecto.append('video', this.validaVideo.valor);
      dataProyecto.append('docs', this.validaArchivos.valor);
      dataProyecto.append('codigoTel', this.validaCodigo.valor);
      dataProyecto.append('numeroTel', this.validaTelefono.valor);
      dataProyecto.append('pagWeb', this.validaPagWeb.valor);
      dataProyecto.append('usuario', tokenDecod.usuarioDBToken.usuarioDB._id);

      dataProyecto.append('nombreUsuario', `${tokenDecod.usuarioDBToken.usuarioDB.nombre}`);
      dataProyecto.append('apellidoUsuario', `${tokenDecod.usuarioDBToken.usuarioDB.apellido}`);
      dataProyecto.append('correoUsuario', `${tokenDecod.usuarioDBToken.usuarioDB.correo}`);

      // enviar la peticion
      this.proyectoService.crearProyecto(dataProyecto)

        // tslint:disable-next-line: deprecation
        .subscribe(event => {

          if (event.type === HttpEventType.UploadProgress) {

            const progressBar = this.progressBar.nativeElement;
            const divBarra = this.divBarra.nativeElement;
            const btnPublicar = this.btnSubmit.nativeElement;
            const btnPrev = this.btnPrev.nativeElement;

            progressBar.style.backgroundColor = 'rgb(233, 236, 239)';

            const porcentaje = Math.round(event.loaded / event.total * 100);
            divBarra.style.width = `${porcentaje}%`;

            btnPublicar.style.cursor = 'no-drop';
            btnPublicar.setAttribute('disabled', 'true');

            btnPrev.style.cursor = 'no-drop';
            btnPrev.setAttribute('disabled', 'true');
            btnPublicar.innerText = 'Publicando...';

          } else {
            // console.log(event);
            if (event.body !== undefined) {

              if (event.body.ok === true) {

                console.log(event.body);
                Swal.fire(
                  'Información',
                  'Negocio creado',
                  'info'
                );
                this.router.navigate(['/user-dashboard/mis-negocios']);
              } else if (event.body.ok === false) {
                Swal.fire(
                  'Información',
                  'No se pudo crear el negocio',
                  'error'
                );

                window.location.reload();
              }
            }
          }
        });
    }
  }

  // desaparecer tooltip
  public fadeOutTooltip(e: Event): void {
    const tooltipDocs = document.getElementById('tooltipDocs');

    tooltipDocs.style.display = 'none';
  }

  // tooltip docs
  public infoDocs(e: Event): void {

    const tooltipDocs = document.getElementById('tooltipDocs');

    tooltipDocs.style.display = 'flex';
    tooltipDocs.style.position = 'absolute';
    tooltipDocs.style.marginTop = '-60px';
    tooltipDocs.style.backgroundColor = 'black';
    tooltipDocs.style.color = 'white';
    tooltipDocs.style.width = 'auto';
    tooltipDocs.style.padding = '5px';
    tooltipDocs.style.borderRadius = '3px';
    tooltipDocs.style.textAlign = 'center';
  }
}
