import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { RemoteImagePipe } from './pipes/remote-image.pipe';
import { VideoCardLayoutComponent } from './components/video-card-layout/video-card-layout.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { MomentModule } from 'ngx-moment';
import { RemoteVideoPipe } from './pipes/remote-video.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    MomentModule
  ],
  declarations: [
    RemoteImagePipe,
    RemoteVideoPipe,
    FileSizePipe,
    VideoCardLayoutComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    RemoteImagePipe,
    RemoteVideoPipe,
    FileSizePipe,
    VideoCardLayoutComponent
  ],
  entryComponents: [],
  providers: [MaterialModule]
})
export class SharedModule {
}
