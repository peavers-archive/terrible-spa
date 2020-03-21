import { environment } from '../../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'remoteImage' })
export class RemoteImagePipe implements PipeTransform {
  transform(ref: string): string {
    return ref == null ? '/assets/placeholder.png' : `${environment.api}/static-resource/image?path=${ref}`;
  }
}
