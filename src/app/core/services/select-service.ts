import { Injectable } from '@angular/core';
import { MediaFile } from '../domain/modules';
import Utils from '../../shared/utils/utils.component';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private _selected: MediaFile[] = [];

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
    this.selected = this.selected.filter(f => mediaFile.id != f.id);

    return false;
  }

  clear() {
    this.selected.forEach(mediaFile => (mediaFile.isSelected = false));

    this.selected = [];

    return false;
  }
}
