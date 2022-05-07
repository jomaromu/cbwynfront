import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CriterioBusquedaBanner, ObjCriterio } from '../../interfaces/criterioBusqueda';
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input() imgBanner: string;
  @Input() tituloBanner: string;

  criterioBusqueda: CriterioBusquedaBanner;
  objetoCriterio: ObjCriterio;

  constructor(
    private proyectoService: ProyectosService,
    private router: Router
  ) {
    this.criterioBusqueda = {
      cantidad: null,
      categoria: null,
      ubicacion: null
    };
  }

  ngOnInit(): void {
    this.proyectoService.getDataBusqueda()
      // tslint:disable-next-line: deprecation
      .subscribe(data => {
        this.criterioBusqueda = data;
      });
  }


  busqueda(e: Event, pais: any, categoria: any): void { // falta cantidad: any

    const valuePais = pais.value;
    const valueCategoria = categoria.value;
    // const valueCantidad = cantidad.value;

    this.objetoCriterio = {
      ubicacion: valuePais,
      categoria: valueCategoria,
      // cantidad: valueCantidad
    };

    // tslint:disable-next-line: max-line-length
    this.router.navigate(['/negocios'], { queryParams: { ubicacion: this.objetoCriterio.ubicacion, categoria: this.objetoCriterio.categoria, cantidad: this.objetoCriterio.cantidad } });
  }

}
