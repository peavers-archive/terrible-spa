import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { RemoteImagePipe } from './pipes/remote-image.pipe';

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
    RemoteImagePipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    RemoteImagePipe
  ],
  entryComponents: [],
  providers: [MaterialModule]
})
export class SharedModule {
}
