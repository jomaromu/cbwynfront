import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProyectosService } from '../services/proyectos.service';
import { NegocioDB } from '../interfaces/respuestas';

@Injectable({
  providedIn: 'root'
})
export class StatusCheckGuard implements CanActivate {

  public idNegocio: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proyectoService: ProyectosService
  ) { }

  async canActivate(): Promise<boolean> {
    const statusCheck = localStorage.getItem('statusCheck');

    if (!statusCheck) {
      this.router.navigate(['/negocios']);
      return false;
    } else {

      this.idNegocio = this.route.snapshot.queryParamMap.get('id');
      const negocio: NegocioDB = await this.proyectoService.obtenerNegocio(this.idNegocio).toPromise();

      console.log(negocio);

      return true;

      // this.route.queryParams.subscribe(async (paramNegocio) => {
      //   const negocio = await this.proyectoService.obtenerNegocio(paramNegocio.negocio).toPromise();

      //   if (negocio.ok === true) {
      //     console.log('valido');
      //     return true;
      //   } else if (negocio.ok === false) {
      //     this.router.navigate(['/negocios']);
      //     localStorage.removeItem('statusCheck');
      //     return true;
      //   }
      // });
    }
  }
}
