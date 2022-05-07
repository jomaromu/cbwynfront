import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'multimedia',
})
export class MultimediaPipe implements PipeTransform {
  constructor(private http: HttpClient) {}

  transform(data: string, tipo: string): any {

    if (!data) {
      return '../../assets/img/logo-final-portada.png';
      // return;
    } else if (!tipo) {
      const data2 = data.replace(/\\/g, '/');

      console.log(data2);
      // const arrayData = data.split('\\'); // local
      const arrayData = data2.split('/'); // nube
      // const path = `${arrayData[6]}/${arrayData[7]}/${arrayData[8]}`;
      // const pathMultimedia = arrayData[arrayData.length - 1];
      // const pathUsuario = arrayData[arrayData.length - 2];
      // const pathCarpeta = arrayData[arrayData.length - 3];
      const pathUsuario = arrayData[arrayData.length - 3];
      const pathNeogocio = arrayData[arrayData.length - 2];
      const pathMultimedia = arrayData[arrayData.length - 1];

      // console.log(arrayData);
      // console.log(pathUsuario);
      // console.log(pathNeogocio);
      // console.log(pathMultimedia);
      // const url = `${environment.urlBack}/negocio/getMultimediaAll?multi=${path}`;
      const url = `${environment.urlBack}/negocio/getMultimediaAll?multi=${pathUsuario}/${pathNeogocio}/${pathMultimedia}`;
      return url;
    } else if (tipo === 'perfil') {
      const data2 = data.replace(/\\/g, '/');
      // const arrayData = data.split('\\'); // local
      const arrayData = data2.split('/'); // nube
      const pathUsuario = arrayData[arrayData.length - 3];
      // const pathUsuario = arrayData[arrayData.length - 2];
      const pathMultimedia = arrayData[arrayData.length - 1];
      const pathPerfil = arrayData[arrayData.length - 2];
      const url = `${environment.urlBack}/usuario/getMultimediaAll?multi=${pathUsuario}/${pathPerfil}/${pathMultimedia}`;
      // const url = `${environment.urlBack}/usuario/getMultimediaAll?multi=${pathUsuario}/${pathMultimedia}`;
      // console.log(pathUsuario, pathPerfil, pathMultimedia);
      return url;
    }
  }
}
