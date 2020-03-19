import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { RemoteImagePipe } from './pipes/remote-image.pipe';
import { VideoCardLayoutComponent } from './components/video-card-layout/video-card-layout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    RemoteImagePipe,
    VideoCardLayoutComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    RemoteImagePipe,
    VideoCardLayoutComponent
  ],
  entryComponents: [],
  providers: [MaterialModule]
})
export class SharedModule {
}
