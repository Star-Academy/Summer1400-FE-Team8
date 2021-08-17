import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'persianData'
})
export class PersianDataPipe implements PipeTransform {

  transform(value: Date | string): unknown
  {
    const date = new Date(value);
    return new Intl.DateTimeFormat('fa-IR').format(date);
  }

}
