import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  public permitido: boolean;
  public suscripcion: Subscription;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  async canActivate(): Promise<boolean> {

    const token = localStorage.getItem('token');

    // si no hay token
    if (!token) {

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
        }
      });
      return false;
    }

    // si existe el token
    if (token) {

      const decodedToken = await this.usuarioService.decodificarToken(token).toPromise();
      const role = decodedToken.usuarioDBToken.usuarioDB.role;

      // caso role
      switch (role) {
        case 'CBWYNROLE':
          return true;
          break;
        case 'ADMINROLE':
          return false;
          break;
      }
    }
  }
}
