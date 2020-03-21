import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
  transform(input: number): string {
    let size = Math.round((input / 1e9) * 100) / 100;
    let unit = '';

    if (size >= 1) {
      unit = 'Gb';
    } else {
      size = Math.round((input / 1e6) * 100) / 100;
      unit = 'Mb';
    }

    return size + unit;
  }
}
