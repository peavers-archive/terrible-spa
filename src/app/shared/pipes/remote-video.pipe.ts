import { environment } from '../../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'remoteVideo' })
export class RemoteVideoPipe implements PipeTransform {
  transform(ref: string): string {
    return `${environment.api}/static-resource/video?id=${ref}`;
  }
}
