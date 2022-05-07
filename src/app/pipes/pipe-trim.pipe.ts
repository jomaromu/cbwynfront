import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeTrim'
})
export class PipeTrimPipe implements PipeTransform {

  transform(value: string): string {

    if (!value) {
      return '';
    } else {
      return value.trim();
    }
  }

}
