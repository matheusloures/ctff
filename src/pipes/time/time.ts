import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('pt-br');
/**
 * Generated class for the TimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    var a = moment(value).format('l'); //14/8/2018
    return a
  }
}
