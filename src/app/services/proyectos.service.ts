import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TodosLosNegocios, NegocioDB } from '../interfaces/respuestas';
import { CriterioBusquedaBanner, ObjCriterio } from '../interfaces/criterioBusqueda';
import { ActualizarNegocio } from '../interfaces/negocio';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(
    private http: HttpClient
  ) { }

  // crear un negocio
  crearProyecto(proyecto: FormData): Observable<any> {

    const url = `${environment.urlBack}/negocio/nuevoNegocio`;

    return this.http.post(url, proyecto, { reportProgress: true, observe: 'events' })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // obtener todos los negocios
  obtenerTodos(): Observable<TodosLosNegocios> {

    const url = `${environment.urlBack}/negocio/obtenerTodos`;
    return this.http.get(url)
      .pipe(
        map((data: TodosLosNegocios) => {
          return data;
        })
      );
  }

  // obtener negocio por id
  obtenerNegocio(idNegocio: string): Observable<TodosLosNegocios> {

    const url = `${environment.urlBack}/negocio/getOne?id=${idNegocio}`;

    return this.http.get(url)
      .pipe(
        map((data: TodosLosNegocios) => {
          return data;
        })
      );
  }

  // obtener los datos de la busqueda
  getDataBusqueda(): Observable<CriterioBusquedaBanner> {

    const urlUbica = '../../assets/json/ubicacion.json';
    const urlCat = '../../assets/json/categoria.json';
    const urlCant = '../../assets/json/cantidad.json';

    const ubicacion = this.http.get(urlUbica);
    const categoria = this.http.get(urlCat);
    const cantidad = this.http.get(urlCant);

    return forkJoin([ubicacion, categoria, cantidad])
      .pipe(
        map((data: any) => {
          const objCriterio: CriterioBusquedaBanner = {
            ubicacion: data[0],
            categoria: data[1],
            cantidad: data[2]
          };
          return objCriterio;
        })
      );
  }

  // busqueda
  busqueda(objCriterio: ObjCriterio): Observable<TodosLosNegocios> {

    const url = `${environment.urlBack}/negocio/busqueda?ubicacion=${objCriterio.ubicacion}&categoria=${objCriterio.categoria}&cantidad=${objCriterio.cantidad}`;

    return this.http.get(url)
      .pipe(
        map((data: TodosLosNegocios) => {
          return data;
        })
      );
  }

  // eliminar un negocio
  eliminarNegocio(negocio: any): Observable<any> {

    const header = new HttpHeaders({ idNegocio: negocio._id, idUsuario: negocio.usuario, pathNegocio: negocio.rutaCorta });

    const url = `${environment.urlBack}/negocio/eliminarNegocio`;

    return this.http.delete(url, { headers: header })
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  // actualizar un negocio
  actualizarNegocio(idNegocio: string, datos: ActualizarNegocio): Observable<NegocioDB> {

    const url = `${environment.urlBack}/negocio/editarNegocio`;
    const header = new HttpHeaders({ idNegocio });

    return this.http.put(url, datos, { headers: header })
      .pipe(
        map((resp: NegocioDB) => {
          return resp;
        })
      );
  }

  // buscar favorito
  buscarFavorito(data: FormData): Observable<any> {

    const url = `${environment.urlBack}/negocio/buscarFavorito`;

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  // crear favorito
  crearFavorito(data: FormData): Observable<any> {

    const url = `${environment.urlBack}/negocio/crearFavorito`;

    return this.http.post(url, data)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  // eliminar favorito
  eliminarFavorito(idUsuario: string, idNegocio: string): Observable<any> {

    const url = `${environment.urlBack}/negocio/eliminarFavorito`;
    const header = new HttpHeaders({ idNegocio, idUsuario });

    return this.http.delete(url, { headers: header })
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  obtenerFavoritos(idUsuario: string): Observable<any> {

    const url = `${environment.urlBack}/negocio/obtenerFavoritos`;
    const header = new HttpHeaders({ idUsuario });
    return this.http.get(url, { headers: header })
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  // obtener docuementos y enlace del negocio
  getDocsNeg(): Observable<any> {

    const objDocsNeg: any = {};

    const url = `${environment.urlBack}negocio/obtenerDoc`;
    const header = new HttpHeaders({ objDocsNeg });

    return this.http.get(url, { headers: header })
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  // envio de correo de compra para contacto a negocio
  correoContacto(data: FormData): Observable<any> {
    // console.log(pathNegocio);

    const url = `${environment.urlBack}/negocio/contactoNegocio`;
    return this.http.post(url, data)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  // envio de correo de la plataforma
  correoPlataforma(data: FormData): Observable<any> {

    const url = `${environment.urlBack}/negocio/contactoPlataforma`;
    return this.http.post(url, data)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }
}
