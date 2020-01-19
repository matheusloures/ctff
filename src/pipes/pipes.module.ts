import { NgModule } from '@angular/core';
import { KeysPipe } from './keys/keys';
import { TimeUnixPipe } from './time/timeunix';
import { TimePipe } from './time/time';
import { DiaSemanaPipe } from './dia-semana/dia-semana';
import { HorasPipe } from './horas/horas';
import { SlicePipe } from './slice/slice';
import { UniqueTimePipe } from './time/unique-time';
import { HorasUnixPipe } from './horas/horasunix';
import { DiaDaSemanaPipe } from './dia-semana/diadasemana';
import { SlashDayPipe } from './dia-semana/slashday';
@NgModule({
	declarations: [KeysPipe,
    TimePipe,
    DiaSemanaPipe,
    HorasPipe,
    SlicePipe,
    UniqueTimePipe,
    HorasUnixPipe,
    TimeUnixPipe,
    DiaDaSemanaPipe,
    SlashDayPipe],
	imports: [],
	exports: [KeysPipe,
    TimePipe,
    DiaSemanaPipe,
    HorasPipe,
    SlicePipe,
    UniqueTimePipe,
    HorasUnixPipe,
    TimeUnixPipe,
    DiaDaSemanaPipe,
    SlashDayPipe]
})
export class PipesModule {}
