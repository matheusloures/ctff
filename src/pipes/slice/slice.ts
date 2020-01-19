import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SlicePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'slice',
})
export class SlicePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    return value.slice(1,-1);
  }
}
