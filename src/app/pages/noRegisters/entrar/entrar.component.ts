import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioLogin } from 'src/app/interfaces/usuarioModel';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  @ViewChild('btnEntrar', { static: true }) btnEntrar: ElementRef<HTMLElement>;
  @ViewChild('txtEntrar', { static: true }) txtEntrar: ElementRef<HTMLElement>;

  formulario: FormGroup;
  recordar: boolean;
  correoRecordado: string;

  // tslint:disable-next-line: quotemark
  private pattherCorreo = ("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$").toLocaleLowerCase();

  public forma: FormGroup;

  // modelo del login
  private usuarioLogin: UsuarioLogin = {
    correo: null,
    password: null
  };

  // propiedades de validaciones
  public msgCorreo = {
    invalido: null,
    mensajes: []
  };

  public msgPass = {
    invalido: null,
    mensajes: []
  };

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.detectarPaddingTop();

    // crear formulario
    this.crearFormulario();
  }

  // crear el formulario
  crearFormulario(): void {

    // manejo recordarme
    let correo = localStorage.getItem('correo');
    if (correo === null) {
      correo = '';
    }

    this.forma = this.fb.group({
      correo: [null, [Validators.required, Validators.pattern(this.pattherCorreo)]],
      pass1: [null, [Validators.required, Validators.minLength(6)]],
      recordarme: [true]
    });
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

  // verificar cantidad igual en passwords
  passCant(): any {

    // si el campo es null o esta vacio
    if (this.forma.controls.pass1.value === null || this.forma.controls.pass1.value === '') {

      this.msgPass.invalido = true;
      this.msgPass.mensajes[0] = 'El campo está vacío';
    }

    // si el campo no es null y no esta vacio
    if (this.forma.controls.pass1.value !== null && this.forma.controls.pass1.value !== '') {

      // si pass1 es menor a 6 caracteres
      if (this.forma.controls.pass1.value.length < 6) {
        this.msgPass.invalido = true;
        this.msgPass.mensajes[0] = 'Mínimo 6 carácteres';
      }

      // si pass1 es mayora 5 y es igual a pass2
      if (this.forma.controls.pass1.value.length > 5) {
        this.msgPass.invalido = false;
      }
    }
  }

  // metodo para manejar recordarme
  recordarme(): void {
    if (this.forma.controls.recordarme.value === true) {

      // meter en localstorage el correo
      localStorage.setItem('correo', this.forma.controls.correo.value);

    } else if (this.forma.controls.recordarme.value === false) {

      // quitar el correo del local storage
      localStorage.removeItem('correo');
    }
  }

  // metodo que loguea un usuario
  async loguearUsuario(): Promise<any> {

    const btnEntrar = this.btnEntrar.nativeElement;
    const txtEntrar = this.txtEntrar.nativeElement;

    btnEntrar.setAttribute('disabled', 'true');
    btnEntrar.style.cursor = 'no-drop';
    txtEntrar.innerText = 'Entrando...';

    this.correoValido();
    this.passCant();
    this.recordarme();

    // interfaz de usuario
    const correoUsuario = this.forma.controls.correo.value;
    const passUsuario = this.forma.controls.pass1.value;

    this.usuarioLogin.correo = correoUsuario;
    this.usuarioLogin.password = passUsuario;

    if (this.msgCorreo.invalido === false && this.msgPass.invalido === false) {

      // loguear usuario
      const resp = await this.usuarioService.loguearUsuario(this.usuarioLogin).toPromise();

      if (resp.ok === true) {

        // set del token
        localStorage.setItem('token', resp.token);

        // loguear y redireccionar
        switch (resp.usuarioDB.role) {
          case 'CBWYNROLE':
            // redirigir a dashboard
            Swal.fire(
              'Mensaje',
              `${resp.usuarioDB.correo} Acceso correcto`,
              'success'
            );
            this.router.navigate(['/user-dashboard']);
            break;
          case 'ADMINROLE':
            console.log('ir a admin');
            break;
        }

      } else if (resp.ok === false) {

        btnEntrar.setAttribute('disabled', '');
        btnEntrar.style.cursor = 'no-drop';
        txtEntrar.innerText = 'Entrando...';

        Swal.fire(
          'Mensaje',
          `${resp.mensaje}`,
          'error'
        );

        btnEntrar.removeAttribute('disabled');
        btnEntrar.style.cursor = 'pointer';
        txtEntrar.innerText = 'Entrar';
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
