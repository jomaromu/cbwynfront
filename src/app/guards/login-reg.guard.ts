import { Injectable } from '@angular/core';
import { CanActivate, } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRegGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService
  ) { }

  async canActivate(): Promise<boolean> {

    const token = localStorage.getItem('token');

    if (!token) {

      return true;

    } else {

      const resp = await this.usuarioService.decodificarToken(token).toPromise();

      return false;
    }

    return true;
  }
}
