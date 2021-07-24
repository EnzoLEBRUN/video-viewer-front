import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'Bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  public bookmarks: any;
  private videoEventSubscription: Subscription;

  constructor(private http: HttpClient, private shared: SharedService) {
    this.videoEventSubscription = this.shared.receiveBookmarkVideoEvent().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.getBookmarks();
  }

  getBookmarks(): any {
    this.http.get(environment.apiURL + 'bookmarks').toPromise().then(data => {
      // @ts-ignore
      this.bookmarks = data['hydra:member'];
    });
  }

  clickBookmark(bookmark: any): void {
    this.shared.setVideoURL(bookmark);
    this.shared.sendVideoEvent();
  }

  deleteBookmark(bookmark: any): void {
    this.http.delete(environment.apiURL + 'bookmarks/' + bookmark['@id'].split('/')[3]).toPromise().then(data => {
      return data;
    });
    this.shared.sendBookmarkVideoEvent();
  }

}
