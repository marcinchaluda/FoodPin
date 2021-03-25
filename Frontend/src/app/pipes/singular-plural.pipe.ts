import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singularPlural'
})
export class SingularPluralPipe implements PipeTransform {

  transform(value: string, quantity: number): string {
    return quantity <= 1 ? value : value + 's';
  }

}
