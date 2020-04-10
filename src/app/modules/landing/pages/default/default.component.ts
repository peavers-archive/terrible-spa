import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {User} from 'firebase';
import {MediaFileService} from '../../../../core/services/media-file.service';
import {Observable} from 'rxjs';
import {MediaFile} from '../../../../core/domain/modules';
import {SearchService} from "../../../../core/services/search.service";

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DefaultComponent implements OnInit {
    mediaFiles: Observable<MediaFile[]> = new Observable<MediaFile[]>();

    user: Observable<User | null> = new Observable<User | null>();

    constructor(private authService: AuthService, private mediaFileService: MediaFileService, private searchService: SearchService) {
    }

    ngOnInit() {
        this.user = this.authService.getUser();
        this.mediaFiles = this.mediaFileService.findAll();
    }

    search(query: any) {
        this.mediaFiles = query ? this.searchService.search(query) : this.mediaFileService.findAll();
    }
}
