import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('pt-br');
/**
 * Generated class for the HorasPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'horasunix',
})
export class HorasUnixPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    var unix = parseInt(value)
    // console.log(value)
    // console.log('unix',unix);
    var a = moment.unix(unix).format('LT'); // 23:27
    return a;
  }
}
