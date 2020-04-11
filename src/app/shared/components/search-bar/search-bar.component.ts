import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchInput = '';

  debouncer: Subject<string | boolean> = new Subject<string | boolean>();

  @Output()
  valueChange = new EventEmitter<string | boolean>();

  constructor() {
    this.debouncer.pipe(debounceTime(250)).subscribe((value) => this.valueChange.emit(value));
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent() {
    if (this.isNotEmpty()) {
      this.debouncer.next(this.searchInput);
    } else {
      this.debouncer.next(false);
    }
  }

  clearSearchInput() {
    this.searchInput = '';

    this.debouncer.next(false);
  }

  isNotEmpty() {
    return this.searchInput.length > 1;
  }
}
