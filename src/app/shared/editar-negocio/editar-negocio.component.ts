import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProyectosService } from '../../services/proyectos.service';

import { ActualizarNegocio } from '../../interfaces/negocio';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-editar-negocio',
  templateUrl: './editar-negocio.component.html',
  styleUrls: ['./editar-negocio.component.css']
})
export class EditarNegocioComponent implements OnInit {

  @Input() negocio: any;
  @Output() editar = new EventEmitter<boolean>();

  @Output() negociosUsuario = new EventEmitter<boolean>();

  public forma: FormGroup;
  public progress = false;

  public actualizaNeg: ActualizarNegocio;

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectosService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {

    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.forma = this.fb.group({
      nombre: [this.negocio.nombre],
      descripcion: [this.negocio.descripcion],
      monto: [this.negocio.monto],
    });
  }

  cerrarModal(): void {
    this.editar.emit(false);
  }

  editarNegocio(e: Event): void {

    this.actualizaNeg = {
      nombre: this.forma.controls.nombre.value,
      descripcion: this.forma.controls.descripcion.value,
      monto: this.forma.controls.monto.value
    };

    // hacer peticion
    this.proyectoService.actualizarNegocio(this.negocio._id, this.actualizaNeg)
      // tslint:disable-next-line: deprecation
      .subscribe(resp => {
        if (resp.ok === false) {
          Swal.fire(
            'Mensaje',
            `${resp.mensaje}`,
            'error'
          );
        } else {
          Swal.fire(
            'Mensaje',
            `${resp.mensaje}`,
            'info'
          );
          this.cerrarModal();
          this.negociosUsuario.emit(true);
        }
      });
  }

}
