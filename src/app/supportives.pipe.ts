import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'supportives'
})
export class SupportivesPipe implements PipeTransform {

  transform(value: Array<string>, args?: any): string {

    if (args) {
      return value.slice(args).join(', ');
    }
    return value.slice(1).join(', ');
  }

}
