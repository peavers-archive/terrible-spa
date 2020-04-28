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
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { UserPictureComponent } from './components/user-picture/user-picture.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { VideoCardMenuComponent } from './components/video-card-menu/video-card-menu.component';

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
    EditDialogComponent,
    RemoteImagePipe,
    RemoteVideoPipe,
    FileSizePipe,
    VideoCardLayoutComponent,
    SearchBarComponent,
    UserPictureComponent,
    VideoCardMenuComponent
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
    VideoCardLayoutComponent,
    VideoCardMenuComponent,
    SearchBarComponent,
    UserPictureComponent
  ],
  entryComponents: [EditDialogComponent],
  providers: [MaterialModule]
})
export class SharedModule {}
