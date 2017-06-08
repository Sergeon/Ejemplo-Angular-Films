import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'list'
})
export class ListPipe implements PipeTransform {

  transform(value: Array<string>, args?: any): string {
    return value.join(', ');
  }

}
