import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageTitleComponent {
  @Input()
  title: string;

  @Input()
  editButton: boolean = false;

  @Input()
  deleteButton: boolean = false;

  @Output()
  editEvent = new EventEmitter<boolean>();

  @Output()
  deleteEvent = new EventEmitter<boolean>();

  constructor() {}

  edit() {
    this.editEvent.emit(true);
  }

  delete() {
    this.deleteEvent.emit(true);
  }
}
