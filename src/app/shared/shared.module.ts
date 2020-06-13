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
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SelectBarComponent } from './components/select-bar/select-bar.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DirectoryDialogComponent } from './components/directory-dialog/directory-dialog.component';

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
    ConfirmDialogComponent,
    RemoteImagePipe,
    RemoteVideoPipe,
    FileSizePipe,
    VideoCardLayoutComponent,
    SearchBarComponent,
    UserPictureComponent,
    VideoCardMenuComponent,
    NavigationBarComponent,
    SelectBarComponent,
    PageTitleComponent,
    DirectoryDialogComponent
  ],
  exports: [
    CommonModule,
    PageTitleComponent,
    SelectBarComponent,
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
    NavigationBarComponent,
    UserPictureComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [EditDialogComponent, ConfirmDialogComponent, DirectoryDialogComponent],
  providers: [MaterialModule]
})
export class SharedModule {}
