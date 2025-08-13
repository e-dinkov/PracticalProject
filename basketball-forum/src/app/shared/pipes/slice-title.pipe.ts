import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceTitle',
})
export class SliceTitlePipe implements PipeTransform {
  transform(value: string, maxLength: number = 50): string {
    if (!value) {
      return '';
    }
    return value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
  }
}
