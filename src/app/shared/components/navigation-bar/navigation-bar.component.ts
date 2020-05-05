import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Utils from '../../utils/utils.component';
import { AuthService } from '../../../core/services/auth.service';
import { SelectService } from '../../../core/services/select-service';
import { MediaListService } from '../../../core/services/media-list.service';
import { SearchService } from '../../../core/services/search.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  @Input()
  hasZeroIndex: boolean;

  isLibraryRoute = false;

  navLinks = [
    {
      path: '/library',
      label: 'favorites',
    },
    {
      path: '/library/collections',
      label: 'my collections',
    },
  ];

  constructor(
    private authService: AuthService,
    private selectService: SelectService,
    private mediaListService: MediaListService,
    private searchService: SearchService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Check here to handle refresh
    this.checkLibraryRoute();

    // Check here to handle normal route load
    this.router.events.subscribe(() => {
      this.checkLibraryRoute();
    });
  }

  checkLibraryRoute() {
    this.isLibraryRoute = this.router.url.includes('library');
  }
}
