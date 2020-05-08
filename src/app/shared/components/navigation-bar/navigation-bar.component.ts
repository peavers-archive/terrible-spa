import { Component, Input, OnInit } from '@angular/core';
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
      label: 'favourites',
    },
    {
      path: '/library/collections',
      label: 'my collections',
    },
  ];

  constructor(private router: Router) {}

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
