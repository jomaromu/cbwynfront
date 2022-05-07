import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { UsuarioService } from '../../services/usuario.service';
import { MultimediaPipe } from '../../pipes/multimedia.pipe';
import validator from 'validator';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [MultimediaPipe]
})
export class PerfilComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  public avatar: File;
  public suscripcionIds: Subscription;

  public datosUsuario = {
    nombre: null,
    apellido: null,
    email: null,
    address: null,
    role: null,
    ubicacion: null,
    avatar: null
  };

  public usuario: any;
  public idSOcket: string;

  constructor(
    private usuarioService: UsuarioService,
    private multimediaPipe: MultimediaPipe
  ) { }

  ngOnInit(): void {
    this.perfilUsuario();
    this.actualizarPerfil();


    // obtener ids socketidsSocket
    this.usuariosCOnectados();
    this.usuarioService.emitGetIds();
  }

  async perfilUsuario(): Promise<any> {

    const token = localStorage.getItem('token');

    if (!token) {
      return;
    } else {
      this.usuarioService.decodificarToken(token)
        .subscribe(usuario => {
          const usuarioDB = usuario.usuarioDBToken.usuarioDB;
          this.usuario = usuarioDB;
          // console.log(usuarioDB);

          this.datosUsuario.nombre = usuarioDB.nombre || 'John';
          this.datosUsuario.apellido = usuarioDB.apellido || 'Doe';
          this.datosUsuario.email = usuarioDB.correo;
          this.datosUsuario.avatar = usuarioDB.avatar;

          switch (usuarioDB.role) {

            case 'CBWYNROLE': {
              this.datosUsuario.role = 'Emprendedor/Inversionista';
              break;
            }
            case 'ADMINROLE': {
              this.datosUsuario.role = 'Administrador';
              break;
            }

            default: {
              this.datosUsuario.role = 'Undefined';
              break;
            }
          }
        });
    }
  }

  editarUsuario(): void {

    const body = document.body;
    const fondo = document.createElement('div');
    const wrapAlert = document.createElement('div');
    const divInputs = document.createElement('div');
    const inputNombre = document.createElement('input');
    const inputApellido = document.createElement('input');
    const img = document.createElement('img');
    const divImg = document.createElement('div');
    const form = document.createElement('form');
    const cerrar = document.createElement('i');
    const boton = document.createElement('button');
    const camera = document.createElement('i');
    const inputFile = document.createElement('input');
    const labelFile = document.createElement('label');

    // fondo
    fondo.style.position = 'fixed';
    fondo.style.top = '0px';
    fondo.style.left = '0px';
    fondo.style.backgroundColor = 'rgba(183, 183, 183, 0.3)';
    fondo.style.width = '100vw';
    fondo.style.height = '100vh';
    fondo.style.zIndex = '9999';
    fondo.style.display = 'flex';
    fondo.style.justifyContent = 'center';
    fondo.style.alignItems = 'center';
    fondo.style.display = 'flex';
    fondo.setAttribute('id', 'fondo');

    // wrapAlert
    wrapAlert.style.width = '430px';
    wrapAlert.style.height = 'auto';
    wrapAlert.style.backgroundColor = 'white';
    wrapAlert.style.borderRadius = '5px';
    wrapAlert.style.boxShadow = '1px 1px 10px rgba(183, 183, 183, 0.3)';
    wrapAlert.style.position = 'relative';
    wrapAlert.style.padding = '20px';
    wrapAlert.classList.add('animate__animated', 'animate__bounceIn');
    wrapAlert.setAttribute('id', 'wrapAlert');

    // cerrar
    cerrar.classList.add('far', 'fa-times-circle');
    cerrar.style.position = 'absolute';
    cerrar.style.cursor = 'pointer';
    cerrar.style.fontSize = '1.7rem';
    cerrar.style.right = '20px';
    cerrar.style.top = '20px';

    // img
    // divImg.style.border = '1px solid pink';
    divImg.style.width = '150px';
    divImg.style.height = '150px';
    divImg.style.marginTop = '80px';
    divImg.style.display = 'flex';
    divImg.style.justifyContent = 'center';
    divImg.style.alignItems = 'center';
    divImg.style.position = 'relative';
    // divImg.style.zIndex = '99';
    divImg.style.cursor = 'pointer';
    divImg.style.borderRadius = '50%';
    divImg.style.overflow = 'hidden';

    const avatar = document.getElementById('avatar').getAttribute('src');
    img.setAttribute('src', `${avatar}`);
    img.setAttribute('id', 'imgAvatar');
    img.style.height = '100%';
    img.style.borderRadius = '50%';
    img.style.border = '1px solid rgba(183, 183, 183)';
    // img.style.cursor = 'pointer';

    camera.classList.add('fas', 'fa-camera');
    camera.style.position = 'absolute';
    camera.style.fontSize = '2rem';
    camera.style.color = 'rgb(9, 173, 208)';
    // camera.style.cursor = 'pointer';

    // input file
    inputFile.setAttribute('type', 'file');
    inputFile.style.position = 'absolute';
    inputFile.style.visibility = 'hidden';
    inputFile.setAttribute('id', 'inputFile');

    labelFile.setAttribute('for', 'inputFile');
    labelFile.style.position = 'absolute';
    labelFile.style.width = '150px';
    labelFile.style.height = '150px';
    // labelFile.style.border = '1px solid green';
    labelFile.style.top = '0px';
    labelFile.style.left = '0px';
    labelFile.style.borderRadius = '50%';
    labelFile.style.cursor = 'pointer';
    labelFile.style.zIndex = '99';

    divImg.append(img, inputFile, labelFile, camera);


    // form
    // form.style.border = '1px solid blue';
    form.style.width = '100%';
    form.style.height = '100%';
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.justifyContent = 'center';
    form.style.alignItems = 'center';

    // inputs
    // divInputs.style.border = '1px solid red';
    divInputs.style.marginTop = '25px';
    divInputs.style.width = '100%';
    divInputs.style.display = 'flex';
    divInputs.style.flexDirection = 'row';
    divInputs.style.justifyContent = 'space-between';
    divInputs.style.alignItems = 'center';

    inputNombre.setAttribute('type', 'text');
    inputNombre.style.width = '45%';
    inputNombre.style.height = '30px';
    inputNombre.style.border = '1px solid rgb(183, 183, 183)';
    inputNombre.value = this.datosUsuario.nombre;


    inputApellido.setAttribute('type', 'text');
    inputApellido.style.width = '45%';
    inputApellido.style.height = '30px';
    inputApellido.style.border = '1px solid rgb(183, 183, 183)';
    inputApellido.value = this.datosUsuario.apellido;

    // boton
    boton.style.width = '150px';
    boton.style.height = '40px';
    boton.style.alignSelf = 'flex-start';
    boton.style.backgroundColor = 'rgb(9, 173, 208)';
    boton.style.color = 'white';
    boton.style.marginTop = '25px';
    boton.innerText = 'Actualizar datos';

    divInputs.append(inputNombre, inputApellido);

    form.append(cerrar, divImg, divInputs, boton);

    wrapAlert.append(form);
    fondo.append(wrapAlert);
    body.append(fondo);

    // EVENTOS

    // cerrar
    cerrar.addEventListener('click', (e) => {
      // console.log('ok');
      inputFile.value = '';
      body.removeChild(fondo);
    });

    // cropper
    inputFile.addEventListener('change', (e) => {
      this.imageChangedEvent = e;

      const wrapCropper = document.getElementById('wrapCropper');
      wrapCropper.style.display = 'flex';

      const idFondo = document.getElementById('fondo');
      idFondo.style.visibility = 'hidden';

    });

    // actualizar datos
    boton.addEventListener('click', async (e) => {
      e.preventDefault();

      const nombre = inputNombre.value;
      const apellido = inputApellido.value;
      const nombrePermitido = validator.isAlphanumeric(nombre, 'es-ES');
      const apellidoPermitido = validator.isAlphanumeric(apellido, 'es-ES');

      const loading = document.createElement('img');
      loading.setAttribute('src', '../../../assets/img/loading.gif');
      loading.style.position = 'absolute';
      loading.style.width = '100px';
      loading.style.zIndex = '9999';

      fondo.append(loading);

      // valida nombre
      if (nombre.length > 10) {
        alert('Maximo 10 caracteres');
      } else {

        if (nombrePermitido === true) {
        } else {
          alert('El campo del nombre no debe estar vacio, ni tener espacios');
        }
      }

      // valida apellido
      if (apellido.length > 10) {
        alert('Maximo 10 caracteres');
      } else {

        if (apellidoPermitido === true) {
        } else {
          alert('El campo del apellido no debe estar vacio, ni tener espacios');
        }
      }

      // enviar datos
      if (nombrePermitido === true && apellidoPermitido === true) {

        const data = new FormData();

        data.append('idUsuario', `${this.usuario._id}`);
        data.append('nombre', `${nombre}`);
        data.append('apellido', `${apellido}`);
        data.append('avatar', this.avatar);

        const resp = await this.usuarioService.actualizarPerfil(data, this.idSOcket).toPromise();
        // console.log('enviar datos', this.idSOcket);
        this.usuarioService.actualizarToken();

        if (resp.ok === true) {
          body.removeChild(fondo);

          Swal.fire(
            'Mensaje',
            'Datos actualizados',
            'info'
          );

        }
      }

    });
  }

  cerrarCropper(): void {

    const idFondo = document.getElementById('fondo');

    const wrapCropper = document.getElementById('wrapCropper');
    const inputFile: any = document.getElementById('inputFile');
    inputFile.value = '';
    wrapCropper.style.display = 'none';

    idFondo.style.visibility = 'visible';

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  async imageCropped(event: ImageCroppedEvent): Promise<any> {
    this.croppedImage = event.base64;
  }

  // convertir base64 en file
  convertBase64ToFile(url, filename, mime): Promise<File> {
    mime = mime || (url.match(/^data:([^;]+);/) || '')[1];
    return (fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mime }))
    );
  }

  // recortar cropp
  async recortarCropp(): Promise<any> {

    if (this.croppedImage !== '') {
      // convetir base64 a file
      this.avatar = await this.convertBase64ToFile(this.croppedImage, `avatar`, 'png');
      const wrapCropper = document.getElementById('wrapCropper');
      const inputFile: any = document.getElementById('inputFile');

      const imgAvatar = document.getElementById('imgAvatar');
      imgAvatar.setAttribute('src', `${this.croppedImage}`);
      wrapCropper.style.display = 'none';

      const idFondo = document.getElementById('fondo');
      idFondo.style.visibility = 'visible';
    }
  }

  // SOCKETS
  actualizarPerfil(): void {
    this.usuarioService.actualizarDatosUsuario()
      .subscribe(resp => {
        this.datosUsuario.nombre = resp.nombre;
        this.datosUsuario.apellido = resp.apellido;
        this.datosUsuario.avatar = resp.avatar;
      });
  }

  usuariosCOnectados(): void {
    this.suscripcionIds = this.usuarioService.usuariosConectados()
      .subscribe(resp => {
        this.idSOcket = resp;
        // console.log(this.idSOcket);
      });
  }

}
