import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'remoteImage' })
export class RemoteImagePipe implements PipeTransform {
  constructor(private authService: AuthService) {
  }

  transform(ref: string): string {
    return ref == null ? '/assets/placeholder.png' : `${environment.api}/static-resource/image?path=${ref}`;
  }
}
