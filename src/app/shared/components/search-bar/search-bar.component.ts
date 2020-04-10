import {Component, EventEmitter, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

    searchInput = '';

    debouncer: Subject<string | boolean> = new Subject<string | boolean>();

    @Output()
    valueChange = new EventEmitter<string | boolean>();

    constructor() {
        this.debouncer
            .pipe(debounceTime(250))
            .subscribe((value) => this.valueChange.emit(value));

    }

    onKey(event) {
        this.debouncer.next(event.target.value);
    }

    clearSearchInput() {
        this.searchInput = '';

        this.debouncer.next(false);
    }
}
