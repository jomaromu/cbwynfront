import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'pipeNegocios',
})
export class PipeNegociosPipe implements PipeTransform {
  constructor(private http: HttpClient) {}

  transform(data: string): any {
    if (!data) {
      return;
    } else {

      const data2 = data.replace(/\\/g, '/');
      const arrayData = data2.split('/');

      const pathUsuario = arrayData[arrayData.length - 3];
      const pathNeogocio = arrayData[arrayData.length - 2];
      const pathMultimedia = arrayData[arrayData.length - 1];

      const url = `${environment.urlBack}/negocio/getMultimediaAll?multi=${pathUsuario}/${pathNeogocio}/${pathMultimedia}`;
      return url;
    }
  }
}
