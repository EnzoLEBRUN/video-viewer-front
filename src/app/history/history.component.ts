import { Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'History',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public histories: any;
  private videoEventSubscription: Subscription;

  constructor(private http: HttpClient, private shared: SharedService) {
    this.videoEventSubscription = this.shared.receiveVideoEvent().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.getHistories();
  }

  getHistories(): any {
    this.http.get(environment.apiURL + 'histories').toPromise().then(data => {
      // @ts-ignore
      this.histories = data['hydra:member'];
    });
  }

  clickHistory(history: any): void {
    this.shared.setVideoURL(history);
    this.shared.sendVideoEvent();
  }

  bookmarked(f: any): void {
    if(this.shared.getVideoURL() !== undefined) {
      let videoURL = {
        url: this.shared.getVideoURL()['url']
      };
      this.addBookmark(videoURL);
    }
    this.shared.sendBookmarkVideoEvent();
  }

  addBookmark(url: any): any {
    this.http.post(environment.apiURL + 'bookmarks', url).toPromise().then(
      data => {
        return data;
      }
    ).catch(err => err);
  }

}
