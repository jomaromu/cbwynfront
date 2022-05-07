import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

// interfaces
import { UsuarioRegistro, UsuarioLogin } from '../interfaces/usuarioModel';
import { UsuarioRegistrado } from '../interfaces/respuestas';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public socketStatus: boolean;

  constructor(
    private http: HttpClient,
    private socket: Socket,
    private router: Router
  ) {
    this.checkStatus();
  }

  // registrar un usuario
  registarUsuario(usuario: UsuarioRegistro): Observable<UsuarioRegistrado> {

    const url = `${environment.urlBack}/usuario/registrar`;

    // hacer peticion
    return this.http.post<UsuarioRegistrado>(url, usuario)
      .pipe(
        map((data: UsuarioRegistrado) => {
          return data;
        })
      );
  }

  // loguear un usuario
  loguearUsuario(usuario: UsuarioLogin): Observable<UsuarioRegistrado> {

    const url = `${environment.urlBack}/usuario/entrar`;

    // hacer peticion
    return this.http.post<UsuarioRegistrado>(url, usuario)
      .pipe(
        map((data: UsuarioRegistrado) => {
          return data;
        })
      );
  }

  // decodificar token
  decodificarToken(token: string): Observable<UsuarioRegistrado> {

    const url = `${environment.urlBack}/usuario/decodedToken`;

    const header = new HttpHeaders({ token });

    // hacer peticion
    return this.http.get<UsuarioRegistrado>(url, { headers: header })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // obtener usuario por ID
  obtenerUsuario(id: string): Observable<UsuarioRegistrado> {

    const url = `${environment.urlBack}/usuario/getUserId`;
    const header = new HttpHeaders({ id });

    return this.http.get<UsuarioRegistrado>(url, { headers: header })
      .pipe(
        map((data: any) => {
          return data;
        })
      );

  }

  // obtener negocios por usuario
  obtenerNegociosUsuario(id: string): Observable<any> {

    const header = new HttpHeaders({ id });
    const url = `${environment.urlBack}/usuario/negociosUsuario`;

    return this.http.get(url, { headers: header })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // actualizar perfil
  actualizarPerfil(data: FormData, idSocket: string): Observable<any> {

    const url = `${environment.urlBack}/usuario/actualizarPerfil`;

    const header = new HttpHeaders({ idSocket });

    return this.http.put(url, data, { headers: header })
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  // verifica estado de la conexion
  checkStatus(): void {

    console.log('inicia checstatus');

    // escuchar el servidor
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  // actualizar token
  async actualizarToken(): Promise<any> {
    const token = localStorage.getItem('token');

    if (!token) {

      return;

    } else {

      // verificar si el token ya vencio
      const tokenDecod = await this.decodificarToken(token).toPromise();

      if (tokenDecod.ok === true) {
        this.decodificarToken(token)
          .pipe(
            mergeMap((resp1) => this.obtenerUsuario(resp1.usuarioDBToken.usuarioDB._id))
            // tslint:disable-next-line: deprecation
          ).subscribe((data) => {
            localStorage.setItem('token', data.token);
          });

      } else {
        // localStorage.removeItem('token');
        Swal.fire({
          title: 'Mensaje',
          text: 'parece que no tiene una sesión activa, Inicie sesión para poder entrar al sistema.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then(result => {
          if (result.isConfirmed) {
            this.router.navigate(['/inicio']);
            localStorage.removeItem('token');
          }
        });
      }
    }
  }

  // SOCKETS
  actualizarDatosUsuario(): Observable<any> {
    return new Observable((subscriber) => {

      this.socket.on('actualizar-perfil', (callback: any) => {
        subscriber.next(callback);
      });

    });
  }

  usuariosConectados(): Observable<any> {
    console.log('desde usuarioConectado servicios');
    return new Observable((subscriber) => {

      this.socket.on('usuarios-conectados', (callback: any) => {
        subscriber.next(callback);
      });

    });
  }

  emitGetIds(): void {
    this.socket.emit('emitGetIds');
  }
}
