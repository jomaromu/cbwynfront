import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../../../services/usuario.service';
import { ProyectosService } from '../../../../services/proyectos.service';
import { NegocioDB } from '../../../../interfaces/respuestas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-negocios',
  templateUrl: './mis-negocios.component.html',
  styleUrls: ['./mis-negocios.component.css']
})
export class MisNegociosComponent implements OnInit {

  public negocios: any;
  public editar = false;
  public negocio: NegocioDB;

  constructor(
    private usuarioService: UsuarioService,
    private proyectoService: ProyectosService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // obtener los negocios del usuario
    this.obtenerNegociosUsuario();
  }

  // obtener negocios por usuario
  obtenerNegociosUsuario(): void {
    const token: string = localStorage.getItem('token');
    this.usuarioService.decodificarToken(token).toPromise().then(data => {
      this.usuarioService.obtenerNegociosUsuario(data.usuarioDBToken.usuarioDB._id).toPromise().then((data2: NegocioDB) => {
        this.negocios = data2.negocioDB;
        // console.log(this.negocios);
      });
    });
  }

  // ver negocio
  verNegocio(e: Event, idNegocio: string): void {
    this.router.navigate([`/negocio`], { queryParams: { id: idNegocio } });
  }

  // eliminar negocio
  eliminarNegocio(e: Event, negocio: any): void {

    Swal.fire({
      icon: 'info',
      title: '¿Desea eliminar este negocio y todos sus registros?',
      showCancelButton: true,
      confirmButtonText: `Ok`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.proyectoService.eliminarNegocio(negocio)
          // tslint:disable-next-line: deprecation
          .subscribe(data => {
            console.log(data);
            // obtener todos los negocios del usuario
            this.obtenerNegociosUsuario();
          });
        Swal.fire('Mensaje', 'Negocio eliminado', 'success');
      }
    });
  }

  // editar negocio
  editarNegocio(e: Event, negocio: any): void {

    this.editar = true;
    this.negocio = negocio;
  }

  cerrarModal(e): void {
    this.editar = e;
  }

  negociosDelUsuario(e): void {

    if (e === true) {
      this.obtenerNegociosUsuario();
    }
  }
}
