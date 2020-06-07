import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageTitleComponent {
  @Input()
  title: string;

  @Input()
  editButton = false;

  @Input()
  deleteButton = false;

  @Input()
  libraryButton = false;

  @Input()
  collectionButton = false;

  @Input()
  sortButton = false;

  @Output()
  editEvent = new EventEmitter<boolean>();

  @Output()
  deleteEvent = new EventEmitter<boolean>();

  @Output()
  libraryEvent = new EventEmitter<boolean>();

  @Output()
  collectionEvent = new EventEmitter<boolean>();

  @Output()
  sortEvent = new EventEmitter<string>();

  constructor() {
  }

  edit() {
    this.editEvent.emit(true);
  }

  delete() {
    this.deleteEvent.emit(true);
  }

  library() {
    this.libraryEvent.emit(true);
  }

  collection() {
    this.collectionEvent.emit(true);
  }

  sort(order: string) {
    this.sortEvent.emit(order);
  }
}
