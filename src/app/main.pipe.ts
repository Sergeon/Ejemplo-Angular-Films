import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'main'
})
export class MainPipe implements PipeTransform {

  transform(value: Array<string>, args?: any): string {
    return value[0];
  }

}
