import { Injectable } from '@angular/core';
import { MediaFile } from '../domain/modules';
import Utils from '../../shared/utils/utils.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private _selected: MediaFile[] = [];

  constructor(private router: Router) {
    // Empty this list if you change pages
    router.events.subscribe(() => {
      this.selected = [];
    });
  }

  set selected(value: MediaFile[]) {
    this._selected = value;
  }

  get selected(): MediaFile[] {
    return this._selected;
  }

  get selectMode(): boolean {
    return Utils.isEmpty(this.selected);
  }

  add(mediaFile: MediaFile) {
    this.selected.push(mediaFile);

    return true;
  }

  remove(mediaFile: MediaFile) {
    this.selected = this.selected.filter((f) => mediaFile.id != f.id);

    return false;
  }

  clear() {
    this.selected.forEach((mediaFile) => (mediaFile.isSelected = false));

    this.selected = [];

    return false;
  }
}
