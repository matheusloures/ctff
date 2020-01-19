import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('pt-br');
/**
 * Generated class for the DiaSemanaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'slashday',
})
export class SlashDayPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    // var day = moment(value);
    var a = moment(value).format('DD-MM-YYYY');
    return a
  }
}
