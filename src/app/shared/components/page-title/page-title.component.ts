import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageTitleComponent {
  @Input()
  input: string;

  constructor() {}
}
