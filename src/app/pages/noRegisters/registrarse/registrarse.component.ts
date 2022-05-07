import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../../../services/usuario.service';
import { environment } from '../../../../environments/environment';
import { UsuarioRegistro } from '../../../interfaces/usuarioModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  @ViewChild('btnRegistrarse', { static: true }) btnRegistrarse: ElementRef<HTMLElement>;
  @ViewChild('txtRegistrarse', { static: true }) txtRegistrarse: ElementRef<HTMLElement>;

  private usuarioModel: UsuarioRegistro = ({
    correo: null,
    password: null,
    soyMayor: null,
    fechaAlta: null,
    role: environment.roleUsuario
  });

  public forma: FormGroup;
  // tslint:disable-next-line: quotemark
  private pattherCorreo = ("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$").toLocaleLowerCase();

  // propiedades de validaciones
  public msgCorreo = {
    invalido: null,
    mensajes: []
  };
  public msgPass = {
    invalido: null,
    mensajes: []
  };
  public msgMayor = {
    invalido: null,
    mensajes: []
  };

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.detectarPaddingTop();

    // crear formulario
    this.crearFormulario();
  }

  // crear el formulario
  crearFormulario(): void {
    this.forma = this.fb.group({
      correo: [null, [Validators.required, Validators.pattern(this.pattherCorreo)]],
      pass1: [null, [Validators.required, Validators.minLength(6)]],
      pass2: [null, [Validators.required, Validators.minLength(6)]],
      soyMayor: [true, Validators.requiredTrue]
    });
  }

  // verificar cantidad igual en passwords
  passIgualesCant(): any {

    // si el campo es null o esta vacio
    if (this.forma.controls.pass1.value === null || this.forma.controls.pass1.value === '') {

      this.msgPass.invalido = true;
      this.msgPass.mensajes[0] = 'El campo está vacío';
    }

    // si el campo es null y no esta vacio
    if (this.forma.controls.pass1.value !== null && this.forma.controls.pass1.value !== '') {

      // si pass1 es menor a 6 caracteres
      if (this.forma.controls.pass1.value.length < 6) {
        this.msgPass.invalido = true;
        this.msgPass.mensajes[0] = 'Mínimo 6 carácteres';
      }

      // si pass1 es mayor a 5 y no son iguales los pass
      if (this.forma.controls.pass1.value.length > 5 && (this.forma.controls.pass1.value !== this.forma.controls.pass2.value)) {
        this.msgPass.invalido = true;
        this.msgPass.mensajes[0] = 'Las contraseñas no son iguales';
      }

      // si pass1 es mayora 5 y es igual a pass2
      if (this.forma.controls.pass1.value.length > 5 && (this.forma.controls.pass1.value === this.forma.controls.pass2.value)) {
        this.msgPass.invalido = false;
      }
    }
  }

  // verificar correo correcto
  correoValido(): any {

    // si es campo esta vacio
    if (this.forma.controls.correo.value === null || this.forma.controls.correo.value === '') {
      this.msgCorreo.invalido = true;
      this.msgCorreo.mensajes[0] = 'El campo está vacío';
    }

    // si el campo no esta vacio
    if (this.forma.controls.correo.value !== null && this.forma.controls.correo.value !== '') {

      if (this.forma.controls.correo.status === 'INVALID') {
        this.msgCorreo.invalido = true;
        this.msgCorreo.mensajes[0] = 'Correo invávlido';
      }

      if (this.forma.controls.correo.status === 'VALID') {
        this.msgCorreo.invalido = false;
      }
    }

  }

  // verificar si es mayor
  soyMayorValido(): any {

    if (this.forma.controls.soyMayor.status === 'INVALID') {
      this.msgMayor.invalido = true;
      this.msgMayor.mensajes[0] = 'Debe ser mayor de edad';
    }

    if (this.forma.controls.soyMayor.status === 'VALID') {
      this.msgMayor.invalido = false;
    }
  }

  // obtener fecha actual
  get fechaALta(): Date {
    const dia = new Date().getDay();
    const mes = new Date().getMonth();
    const anio = new Date().getFullYear();

    const fecha = new Date(anio, mes, dia);
    return fecha;
  }

  // metodo que registra un usuario
  async registrarUsuario(): Promise<any> {

    const btnRegistrarse = this.btnRegistrarse.nativeElement;
    const txtRegistrarse = this.txtRegistrarse.nativeElement;

    // metodos con las validaciones
    this.correoValido();
    this.passIgualesCant();
    this.soyMayorValido();

    const correoUsuario = this.forma.controls.correo.value;
    const passUsuario = this.forma.controls.pass1.value;
    const soyMayor = this.forma.controls.soyMayor.value;

    // intefaz del usuario
    this.usuarioModel.correo = correoUsuario;
    this.usuarioModel.password = passUsuario;
    this.usuarioModel.soyMayor = soyMayor;
    this.usuarioModel.fechaAlta = this.fechaALta;

    if (this.msgCorreo.invalido === false && this.msgMayor.invalido === false && this.msgPass.invalido === false) {

      btnRegistrarse.setAttribute('disabled', 'true');
      btnRegistrarse.style.cursor = 'no-drop';
      txtRegistrarse.innerText = 'Registrandose...';

      // registro el usuario
      const resp = await this.usuarioService.registarUsuario(this.usuarioModel).toPromise();

      if (resp.ok === true) {

        btnRegistrarse.setAttribute('disabled', '');
        btnRegistrarse.style.cursor = 'no-drop';
        txtRegistrarse.innerText = 'Registrandose...';

        Swal.fire(
          'Mensaje',
          `${resp.usuarioDB.correo} Registrado correctamente`,
          'success'
        );

        // redirigir a inicio
        this.router.navigate(['/entrar']);

      } else if (resp.ok === false) {
        Swal.fire(
          'Mensaje',
          `${resp.mensaje}`,
          'error'
        );

        btnRegistrarse.removeAttribute('disabled');
        btnRegistrarse.style.cursor = 'pointer';
        txtRegistrarse.innerText = 'Registrarme';
      }
    }
  }

  detectarPaddingTop(): void {

    const detectPaddingTop = setInterval(() => {

      const paddingTop = document.getElementById('paddingTop');

      if (!paddingTop || (paddingTop.clientHeight === 0)) {
        clearInterval(detectPaddingTop);
      } else {
        paddingTop.style.height = '0px';
        clearInterval(detectPaddingTop);
      }
    }, 10);
  }

}
