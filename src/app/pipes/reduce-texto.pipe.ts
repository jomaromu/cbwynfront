import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceTexto'
})

/* data
cantidad texto a mostrar */

export class ReduceTextoPipe implements PipeTransform {

  constructor(

  ) { }

  transform(data: string, cantTexto: number): string {

    let nuevaData = data;
    if (nuevaData.length > 40) {
      nuevaData = `${data.slice(0, cantTexto)}...`;
      return nuevaData;
    } else {
      return data;
    }
  }

}
